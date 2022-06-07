require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ganache");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

require("./tasks/faucet");

module.exports = {
  defaultNetwork:"ganache",
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },

  networks: {
    ganache: {
      url: 'http://ganache:8545',
      accounts: {
        mnemonic: 'tail actress very wool broom rule frequent ocean nice cricket extra snap',
        path: " m/44'/60'/0'/0/",
        initialIndex: 0,
        count: 20,
      },
    },
    bsct: {
      url: `https://speedy-nodes-nyc.moralis.io/7180c6b04212cccaf7fac2d1/bsc/testnet`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      // gas: 8100000,
      gasPrice: 8000000000
    },
    // hardhat: {
    //   forking: {
    //     url: "https://arb-mainnet.g.alchemy.com/v2/06m5qoR4dllvwAuifEg3xOjUoIvyfOYe",
    //   }
    // }
   },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_KEY}`
  },
  mocha: {
    timeout: 400000000
  }
};