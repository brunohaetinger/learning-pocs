# Counter Contract

## Steps to run on https://remix.ethereum.org

### Step 1: Compile the Contract
    Click the Solidity Compiler tab (looks like a "sol" document).
    Make sure the compiler version matches the pragma (e.g., 0.8.x).
    Click Compile Counter.sol.
You should see a green checkmark if successful.

### Step 2: Deploy the Contract
    Click the Deploy & Run Transactions tab (Ethereum icon).
    Under Environment, choose:
        JavaScript VM (London) to simulate blockchain in-browser.
        Or choose Injected Provider - MetaMask to use your MetaMask wallet (you’ll need testnet ETH).
    Ensure the Contract dropdown is set to Counter.
    Click Deploy.

After deployment, the contract instance will appear below with buttons to interact with it.

### Step 3: Interact with the Contract

In the deployed contract section:
    Click count → Should return 0.
    Click increment() → Then check count again → It will return 1.
    Click decrement() → Back to 0.

You can see:
    Logs (console output)
    Transaction gas cost
    Storage values


### Optional Step: Deploy on a Testnet

To use MetaMask + a testnet like Sepolia:
    Set MetaMask to the Sepolia network
    Get test ETH from https://sepoliafaucet.com
    In Remix, set Environment to Injected Provider.
    Deploy your contract again, this time for real on a testnet.
