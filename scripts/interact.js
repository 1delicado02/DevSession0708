const { ethers } = require('ethers');

require('dotenv').config()

// Create a provider to connect to the testnet
// Connect to the deployed contracts using their addresses and ABI
// const tokenAddress = '0x87759b5E6aF73ad5c56c7F4A91cf2913B7751d46';
// const govAddress = '0xa8F7332351118EC947E5b09Ec930916Cd7560B29';
//const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
// const privateKey = process.env.GOERLI_PRIVATE_KEY;
// Create a provider to connect to the local network


const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const govAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Replace with a private key from a local account



// Create instances of the deployed contracts
const tokenContract = new ethers.Contract(tokenAddress, [
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "sender",
          "type": "address"
        },
        {
          "name": "recipient",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "_beforeTokenTransfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "recipient",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "totalSupply_",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ], provider);
const govContract = new ethers.Contract(govAddress, [
    {
      inputs: [
        {
          internalType: 'contract IVotes',
          name: '_token',
          type: 'address',
        },
        {
          internalType: 'contract TimelockController',
          name: '_timelock',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'Empty',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'ProposalCanceled',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'proposer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address[]',
          name: 'targets',
          type: 'address[]',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
        {
          indexed: false,
          internalType: 'string[]',
          name: 'signatures',
          type: 'string[]',
        },
        {
          indexed: false,
          internalType: 'bytes[]',
          name: 'calldatas',
          type: 'bytes[]',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'startBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'endBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
      ],
      name: 'ProposalCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'ProposalExecuted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'eta',
          type: 'uint256',
        },
      ],
      name: 'ProposalQueued',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldProposalThreshold',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newProposalThreshold',
          type: 'uint256',
        },
      ],
      name: 'ProposalThresholdSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldQuorumNumerator',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newQuorumNumerator',
          type: 'uint256',
        },
      ],
      name: 'QuorumNumeratorUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldTimelock',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newTimelock',
          type: 'address',
        },
      ],
      name: 'TimelockChange',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'weight',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
      ],
      name: 'VoteCast',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'weight',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'params',
          type: 'bytes',
        },
      ],
      name: 'VoteCastWithParams',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldVotingDelay',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newVotingDelay',
          type: 'uint256',
        },
      ],
      name: 'VotingDelaySet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldVotingPeriod',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newVotingPeriod',
          type: 'uint256',
        },
      ],
      name: 'VotingPeriodSet',
      type: 'event',
    },
    {
      inputs: [],
      name: 'BALLOT_TYPEHASH',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'COUNTING_MODE',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'EXTENDED_BALLOT_TYPEHASH',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
      ],
      name: 'castVote',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32',
        },
      ],
      name: 'castVoteBySig',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
        {
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
      ],
      name: 'castVoteWithReason',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
        {
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
        {
          internalType: 'bytes',
          name: 'params',
          type: 'bytes',
        },
      ],
      name: 'castVoteWithReasonAndParams',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'uint8',
          name: 'support',
          type: 'uint8',
        },
        {
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
        {
          internalType: 'bytes',
          name: 'params',
          type: 'bytes',
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32',
        },
      ],
      name: 'castVoteWithReasonAndParamsBySig',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'targets',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes[]',
          name: 'calldatas',
          type: 'bytes[]',
        },
        {
          internalType: 'bytes32',
          name: 'descriptionHash',
          type: 'bytes32',
        },
      ],
      name: 'execute',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256',
        },
      ],
      name: 'getVotes',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'params',
          type: 'bytes',
        },
      ],
      name: 'getVotesWithParams',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasVoted',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'targets',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes[]',
          name: 'calldatas',
          type: 'bytes[]',
        },
        {
          internalType: 'bytes32',
          name: 'descriptionHash',
          type: 'bytes32',
        },
      ],
      name: 'hashProposal',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      name: 'onERC1155BatchReceived',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      name: 'onERC1155Received',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      name: 'onERC721Received',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'proposalDeadline',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'proposalEta',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'proposalSnapshot',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proposalThreshold',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'proposalVotes',
      outputs: [
        {
          internalType: 'uint256',
          name: 'againstVotes',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'forVotes',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'abstainVotes',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'targets',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes[]',
          name: 'calldatas',
          type: 'bytes[]',
        },
        {
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
      ],
      name: 'propose',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'targets',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes[]',
          name: 'calldatas',
          type: 'bytes[]',
        },
        {
          internalType: 'bytes32',
          name: 'descriptionHash',
          type: 'bytes32',
        },
      ],
      name: 'queue',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256',
        },
      ],
      name: 'quorum',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'quorumDenominator',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256',
        },
      ],
      name: 'quorumNumerator',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'quorumNumerator',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'relay',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newProposalThreshold',
          type: 'uint256',
        },
      ],
      name: 'setProposalThreshold',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newVotingDelay',
          type: 'uint256',
        },
      ],
      name: 'setVotingDelay',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newVotingPeriod',
          type: 'uint256',
        },
      ],
      name: 'setVotingPeriod',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'state',
      outputs: [
        {
          internalType: 'enum IGovernor.ProposalState',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'timelock',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [
        {
          internalType: 'contract IVotes',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newQuorumNumerator',
          type: 'uint256',
        },
      ],
      name: 'updateQuorumNumerator',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract TimelockController',
          name: 'newTimelock',
          type: 'address',
        },
      ],
      name: 'updateTimelock',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'votingDelay',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'votingPeriod',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ], provider);

// Set up a signer with your private key to send transactions

const wallet = new ethers.Wallet(privateKey, provider);
const signedTokenContract = tokenContract.connect(wallet);
const signedGovContract = govContract.connect(wallet);

// Interact with the contracts
async function interactWithContracts() {
  // Example: Call a read-only function on the Token contract
  const tokenName = await tokenContract.name;
  console.log('Token Name:', tokenName);

  

  // Example: Send a transaction to the Token contract
  const recipientAddress = govAddress;
  const amount = 10;
  const transferTx = await signedTokenContract.mint(recipientAddress, 1000);
  await transferTx.wait();

//   // Example: Send a transaction to the Gov contract
//   const proposalTx = await signedGovContract.propose([recipientAddress], [amount], ['0x'], 'Once appon a time...');
  
//   await proposalTx.wait();

//   const castVotTx = signedGovContract.castVote(proposalTx, true);
//   await castVotTx.wait();

//   console.log('story: ', signedGovContract.getStory());


//   // ... Continue interacting with the contracts as needed
}

interactWithContracts();
