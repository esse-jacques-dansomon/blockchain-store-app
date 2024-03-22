const hre = require('hardhat')
async function main() {
  // We get the contract to deploy
  const Store = await hre.ethers.getContractFactory('Store')
  const store = await Store.deploy()
  await store.deployed()

  console.log('Dappazon deployed to:', store.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
