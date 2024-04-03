
const hre = require('hardhat')
const data = require('./store.data.json')
const {formatUnits} = require("ethers/lib/utils");
const tokens = (n) => hre.ethers.utils.parseUnits(n.toString(), 'ether')

async function main() {
  // We get the contract to deploy
  const Store = await hre.ethers.getContractFactory('Store')
  const store = await Store.deploy()
  await store.deployed()

  let isSeed = true
  let shopOwners = await hre.ethers.getSigners()

  if(isSeed){
    //add shop, category and products
    let idCategory = 0
    for (let i = 0; i < data.stores.length; i++) {
      let shopOwner = shopOwners[i + 1]
      console.log("-------------------------------------------------------")
      console.log('Shop Owner:', shopOwner.address)
      let shop = data.stores[i]
      const tx = await store.connect(shopOwner).createStore(shop.name, shop.location)
      await tx.wait()
      console.log(shop.name, 'Store created')

      for (let j = 0; j < shop.categories.length; j++) {
        let category = shop.categories[j]
        const tx = await store.connect(shopOwner).createCategory(category.name, category.description)
        let categoryCreated = await tx.wait()
        console.log('Category created')
        console.log('Category Name:', category.name)
        console.log('Category Producrs:', category.products.length)
        for (let k = 0; k < category.products.length; k++) {
          console.log('=---------Product Name:', category.products[k].name)
          let product = category.products[k]
          const tx = await store.connect(shopOwner).createProduct(product.name, 'QmXm32BLCkvhPa14DcnCZnZAXn5AspF1bDkBdJNYkkkU6B', tokens(k +1), product.quantity, idCategory)
          await tx.wait()
          console.log('------------Product created')
        }
        idCategory= idCategory + 1


      }
      console.log("-------------------------------------------------------")
    }

  }

  console.log('Store deployed to:', store.address)
  console.log('Store Owner:', shopOwners[0].address)


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
