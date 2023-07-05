const { ethers } = require("hardhat");
const { expect } = require("chai");

const createdVoteId = (receipt) => receipt.events.filter((e) => e.event === "StartVote")[0].args.voteId;

const VOTER_STATE = ["ABSENT", "YEA", "NAY"].reduce((state, key, index) => {
  state[key] = index;
  return state;
}, {});

describe("Voting App", function () {
  let votingBase, voting, token, executionTarget;
  let CREATE_VOTES_ROLE, MODIFY_SUPPORT_ROLE, MODIFY_QUORUM_ROLE;

  const NOW = 1;
  const votingDuration = 1000;
  const APP_ID = "0x1234123412341234123412341234123412341234123412341234123412341234";

  before(async function () {
    [root, holder1, holder2, holder20, holder29, holder51, nonHolder] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("VotingMock");
    votingBase = await Voting.deploy();
    await votingBase.deployed();

    CREATE_VOTES_ROLE = await votingBase.CREATE_VOTES_ROLE();
    MODIFY_SUPPORT_ROLE = await votingBase.MODIFY_SUPPORT_ROLE();
    MODIFY_QUORUM_ROLE = await votingBase.MODIFY_QUORUM_ROLE();
  });

  beforeEach(async function () {
    const { dao, acl } = await newDao(root.address);
    const Voting = await ethers.getContractFactory("VotingMock");
    voting = await Voting.attach(await installNewApp(dao.address, APP_ID, votingBase.address, root.address));
    await voting.mockSetTimestamp(NOW);
    await acl.createPermission(ANY_ENTITY, voting.address, CREATE_VOTES_ROLE, root.address);
    await acl.createPermission(ANY_ENTITY, voting.address, MODIFY_SUPPORT_ROLE, root.address);
    await acl.createPermission(ANY_ENTITY, voting.address, MODIFY_QUORUM_ROLE, root.address);
  });

  context("normal token supply, common tests", function () {
    const neededSupport = pct16(50);
    const minimumAcceptanceQuorum = pct16(20);

    beforeEach(async function () {
      const MiniMeToken = await ethers.getContractFactory("@aragon/minime/contracts/MiniMeToken.sol:MiniMeToken");
      token = await MiniMeToken.deploy(ZERO_ADDRESS, ZERO_ADDRESS, 0, "n", 0, "n", true);
      await token.deployed();
      await voting.initialize(token.address, neededSupport, minimumAcceptanceQuorum, votingDuration);
      executionTarget = await ExecutionTarget.new();
    });

    it("fails on reinitialization", async function () {
      await expect(
        voting.initialize(token.address, neededSupport, minimumAcceptanceQuorum, votingDuration)
      ).to.be.revertedWith(ERRORS.INIT_ALREADY_INITIALIZED);
    });

    it("cannot initialize base app", async function () {
      const Voting = await ethers.getContractFactory("VotingMock");
      const newVoting = await Voting.deploy();
      assert.isTrue(await newVoting.isPetrified());
      await expect(
        newVoting.initialize(token.address, neededSupport, minimumAcceptanceQuorum, votingDuration)
      ).to.be.revertedWith(ERRORS.INIT_ALREADY_INITIALIZED);
    });

    it("checks it is forwarder", async function () {
      expect(await voting.isForwarder()).to.be.true;
    });

    it("can change required support", async function () {
      const receipt = await voting.changeSupportRequiredPct(neededSupport.add(bn(1)));
      const voteId = createdVoteId(receipt);
      const vote = await voting.getVote(voteId);
      expect(vote.supportRequired).to.equal(neededSupport.add(1));
    });

    it("can change minimum acceptance quorum", async function () {
      const receipt = await voting.changeMinAcceptQuorumPct(minimumAcceptanceQuorum.add(bn(1)));
      const voteId = createdVoteId(receipt);
      const vote = await voting.getVote(voteId);
      expect(vote.minAcceptQuorum).to.equal(minimumAcceptanceQuorum.add(1));
    });

    it("can create a vote with token transfer", async function () {
      const voteParams = {
        tokenAmount: bn(100),
        supports: [true, false, true],
        reasons: ["Reason 1", "Reason 2", "Reason 3"],
      };
      const receipt = await voting.newVote(executionTarget.address, voteParams.tokenAmount, ...voteParams.supports, ...voteParams.reasons);
      const voteId = createdVoteId(receipt);
      const vote = await voting.getVote(voteId);
      expect(vote.executed).to.be.false;
      expect(vote.startDate).to.equal(NOW);
      expect(vote.snapshotBlock).to.equal(receipt.blockNumber - 1);
      expect(vote.supportRequired).to.equal(neededSupport);
      expect(vote.minAcceptQuorum).to.equal(minimumAcceptanceQuorum);
      expect(vote.yea).to.equal(bn(0));
      expect(vote.nay).to.equal(bn(0));
      expect(vote.creator).to.equal(root.address);

      const tokenBalanceBefore = await token.balanceOf(executionTarget.address);
      await voting.vote(voteId, true, "Vote for");
      const tokenBalanceAfter = await token.balanceOf(executionTarget.address);
      expect(tokenBalanceAfter.sub(tokenBalanceBefore)).to.equal(voteParams.tokenAmount);
    });

    it("can create a vote without token transfer", async function () {
      const voteParams = {
        tokenAmount: bn(0),
        supports: [true, false, true],
        reasons: ["Reason 1", "Reason 2", "Reason 3"],
      };
      const receipt = await voting.newVote(executionTarget.address, voteParams.tokenAmount, ...voteParams.supports, ...voteParams.reasons);
      const voteId = createdVoteId(receipt);
      const vote = await voting.getVote(voteId);
      expect(vote.executed).to.be.false;
      expect(vote.startDate).to.equal(NOW);
      expect(vote.snapshotBlock).to.equal(receipt.blockNumber - 1);
      expect(vote.supportRequired).to.equal(neededSupport);
      expect(vote.minAcceptQuorum).to.equal(minimumAcceptanceQuorum);
      expect(vote.yea).to.equal(bn(0));
      expect(vote.nay).to.equal(bn(0));
      expect(vote.creator).to.equal(root.address);

      await voting.vote(voteId, true, "Vote for");
      const tokenBalanceAfter = await token.balanceOf(executionTarget.address);
      expect(tokenBalanceAfter).to.equal(bn(0));
    });
  });
});

