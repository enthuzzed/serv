const Web3 = require('web3');
const etherscanBaseUrl = 'https://etherscan.io/tx/'; // Etherscan URL

// Assuming you have your contract ABI and contract address
const contractABI = 

export const abi = `[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_clickCounts",
        "type": "uint256"
      }
    ],
    "name": "Click",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "click",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "clickCounts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`; // Your contract's ABI
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Your contract's address
const privateKey = '045dc7f4f349789ea1efe32613a2c1f690bdcec40cd73ad826fe464e1bc8b9e3'; // Your private key

const providerUrl = 'https://sepolia.infura.io/v3/6dc016e17bbb4530958e787999eed7c9'; // Replace with your Infura endpoint or any other Ethereum node

const web3 = new Web3(providerUrl);

// Set up the account using the private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Initialize the contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to interact with the smart contract
async function callClickFunction() {
    try {
        const result = await contract.methods.click().send({ from: account.address });
        console.log('Transaction hash:', result.transactionHash);
        console.log('Transaction link:', etherscanBaseUrl + result.transactionHash);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function
callClickFunction();
