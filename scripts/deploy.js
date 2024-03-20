const hre = require('hardhat')
const tokens = (n) => hre.ethers.utils.parseUnits(n.toString(), 'ether')
const { items} = require('./items.json')
async function main() {
  // We get the contract to deploy
  const [deployer] = await hre.ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  // We get the contract to deploy
  const Dappazon = await hre.ethers.getContractFactory('Dappazon')
  const dappazon = await Dappazon.deploy()
  await dappazon.deployed()

  console.log('Dappazon deployed to:', dappazon.address)

  // add products
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    let transaction = await dappazon.connect(deployer).addProduct(
      item.id,
      item.name,
      item.category,
      item.description,
      item.image,
      tokens(item.cost),
      item.stock,
      item.rating
      )
    await transaction.wait();
  }


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
