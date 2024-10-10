require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
require("hardhat-docgen");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("hardhat-tracer");
require("hardhat-log-remover");
require('dotenv').config()

const mnemonic = process.env.MNEMONIC

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    mocha: {
        timeout: 1200000,
    },
    solidity: {
        compilers: [{
            version: "0.8.20",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                    details: {
                        yul: true,
                    },
                },
                viaIR: true,
            }
        }]
    },
    gasReporter: {
        currency: 'USD',
        L1: "ethereum",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        enabled: true,
        gasPrice: "15"

    },
    networks: {
        hardhat: {
            accounts: {
                mnemonic,
            },
        },
        ethereum: {
            url: `https://eth-mainnet.nodereal.io/v1/${process.env.NODEREAL_KEY}`,
            accounts: {
                mnemonic,
            },
        },
        ftmtestnet: {
            url: `https://rpc.testnet.fantom.network/`,
            accounts: {
                mnemonic,
            },
        },

    },
    etherscan: {
        apiKey: {
            mainnet: `${process.env.ETHERSCAN_KEY}`,
            ftmTestnet: `${process.env.FANTOM_KEY}`,


        },
    },
    docgen: {
        path: "./docs",
        clear: true,
        runOnCompile: false,
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    typechain: {
        outDir: "typechain-types",
        target: "ethers-v6",
    },

};