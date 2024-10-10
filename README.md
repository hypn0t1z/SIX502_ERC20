## Installation

To install and use the contracts, follow these steps:

1. **Config env file:**
    - Copy `.env.example` to `.env`
    - Configure the variable `MNEMONIC` with your mnemonic phrase
    - Configure the variable `nodereal` with your NodeReal URL: `https://dashboard.nodereal.io/`
    - Configure the variable `etherscan` with your Etherscan API URL: `https://etherscan.io/apis`

2. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Compile the contracts:**
    ```bash
    npx hardhat compile
    ```

5. **Run the deploy:**
    Configure your token ERC20 in the deploy script:
    ```javascript
    const NAME = "SIX502";
    const SYMBOL = "SIX";
    const INITIALSUPPLY = 2024;
    ```

    Deploy the contract to the desired network:
    ```bash
    npm run deploy --network <NETWORK>
    ```

    Example:
    ```bash
    npm run deploy --network ethereum
    ```
