const { ethers } = require("hardhat");

async function generateCalldata() {
  const Voting = await ethers.getContractFactory("Voting");

  // An array of strings for the questions whose calldata is being generated
  const questions = [];

  const script = "0x";
  const castVote = false;
  const executeIfDecided = false;

  // the address doesnt matter as we are only generating the calldata
  const voting = await Voting.attach("0xcafE1A77e84698c83CA8931F54A755176eF75f2C");
  const newVoteRequest = voting.interface.functions.newVote.encode([
    script,
    "",
    castVote,
    executeIfDecided,
  ]);

  const calldata = questions.map((question) => {
    return voting.interface.functions.newVote.encode([
      script,
      question,
      castVote,
      executeIfDecided,
    ]);
  });

  console.log(calldata);
}

generateCalldata().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
