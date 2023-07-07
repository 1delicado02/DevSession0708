require('@nomiclabs/hardhat-waffle');
require('hardhat-gas-reporter');
require('dotenv').config();

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 500
      }
    }
  },
  
  // https://hardhat.org/metamask-issue.html
  // networks: {
  //   hardhat: {
  //     chainId: 137,
  //     allowUnlimitedContractSize: true,
  //   },
  //   localhost: { allowUnlimitedContractSize: true },
  // },
 networks: {
    goerli: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    }
  },

  gasReporter: {
    enabled: true,
    currency: 'JPY',
    showTimeSpent: true,
    showMethodSig: true,
    // coinmarketcap: 'Key',
    gasPriceApi:
      'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
  },
};
