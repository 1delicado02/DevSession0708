const { ethers } = require('hardhat');

async function main() {
  
  const [owner, otherAccount] = await ethers.getSigners();
  
  const Gov = await ethers.getContractFactory('StoryRelay');
  const Token = await ethers.getContractFactory('Token');
  const TLC = await ethers.getContractFactory('TLC');

  const token = await Token.deploy(
    'StoryRelayToken',
    'StoryR',
    '10000000000000000000000'
  );
  const minDelay = 1;
  let proposers;
  let executors;

  try{
    proposers = [otherAccount.address];
    executors = [otherAccount.address];
  }catch(e){
    proposers = [owner.address];
    executors = [owner.address]; 
  }
  

  const tlc = await TLC.deploy(minDelay, proposers, executors);
  const TokenAddress = token.address;
  const TlcAddress = tlc.address;

  const gov = await Gov.deploy(TokenAddress, TlcAddress);
  await token.deployed();
  await gov.deployed();
  await tlc.deployed();
  console.log(`token deployed to ${token.address}`);
  console.log(`StoryRelay deployed to ${gov.address}`);
  console.log(`tlc deployed to ${tlc.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
