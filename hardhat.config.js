require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: 'http://localhost:8545'
    },
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [privateKey]
    },
    testnet: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey]
    },
    mainnet: {
      url: 'https://polygon-rpc.com',
      accounts: [privateKey]
    }
  },
  solidity: '0.8.9'
}
