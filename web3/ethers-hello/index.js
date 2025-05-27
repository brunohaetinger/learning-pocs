import { ethers } from "ethers";

// Connect to MetaMask
const provider = new ethers.BrowserProvider(window.ethereum);

// Get signer
const signer = await provider.getSigner();

// Load a contract
const contract = new ethers.Contract(contractAddress, abi, signer);

// Call a function
await contract.increment();
