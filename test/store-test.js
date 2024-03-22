const { expect } = require("chai");
const { ethers } = require("hardhat");
const {exec} = require("node:child_process");
const tokens = (n) => ethers.utils.parseUnits(n.toString(), "wei");

describe("Store", () => {
  let Store;
  let store;
  let owner;
  let addr1;
  let shop = {
    name: "Ultra",
    location: "Rennes France"
  }
  let category = {
    name: "Electronics",
    description: "Electronics"
  }
  let product = {
    name: "Macbook Pro",
    image: "macbook.jpg",
    price: tokens(1),
    quantity: 10,
    categoryId: 0
  }
  let addr2;
  let addr3;


  beforeEach(async () => {
    Store = await ethers.getContractFactory("Store");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    store = await Store.deploy();
    await store.deployed();
  });

  describe("Deployment and Initialization", () => {
    it("Should deploy and initialize the contract", async () => {
      expect(await store.owner()).to.equal(owner.address);
    });
  });

  describe("Adding Shop & Products", () => {
    let shopTransaction;
    let categoryTransaction;

    beforeEach(async () => {
      shopTransaction =  await store.connect(addr1).createStore(shop.name, shop.location)
      await shopTransaction.wait()

      categoryTransaction = await store.connect(addr1).createCategory(
        category.name, category.description)
      await categoryTransaction.wait()
    });

    it('Should not allow to create shop if already exists', async () => {
      await expect(store.connect(addr1).createStore(
        shop.name, shop.location
      )).to.be.revertedWith('Store already exists')
    })

    it("Should not create shop with empty values", async () => {
      await expect(store.connect(addr1).createStore("", shop.location)).to.be.revertedWith("Store name cannot be empty");
      await expect(store.connect(addr1).createStore(shop.name, "")).to.be.revertedWith("Store location cannot be empty");
    })

    it('should create shop', async () => {
      let shopCreated = await store.getStore(addr1.address)
      expect(shopCreated.name).to.equal(shop.name)
      expect(shopCreated.location).to.equal(shop.location)
    });


    it("Should not create category with empty values", async () => {
      await expect(store.connect(addr1).createCategory("", category.description)).to.be.revertedWith("Category name cannot be empty'");
      await expect(store.connect(addr1).createCategory(category.name, "")).to.be.revertedWith("Category description cannot be empty");
    })


    it('should create category', async () => {
      let categoryCreated = await store.getCategory(0);
      expect(categoryCreated.name).to.equal(category.name)
      expect(categoryCreated.description).to.equal(category.description)
    });

    it('should not allow to create invalid product', async () => {
      await expect(store.connect(addr2).createProduct(
        product.name, product.image, product.price, product.quantity, product.categoryId
      )).to.be.revertedWith('Store does not exist')
      await expect(store.connect(addr1).createProduct(
        "", product.image, product.price, product.quantity,product.categoryId
      )).to.be.revertedWith("Product name cannot be empty");

      await expect(store.connect(addr1).createProduct(
        product.name, "", product.price, product.quantity, product.categoryId
      )).to.be.revertedWith("Product image cannot be empty");

      await expect(store.connect(addr1).createProduct(
        product.name, product.image, 0, product.quantity, product.categoryId
      )).to.be.revertedWith('Product price must be greater than zero');

      await expect(store.connect(addr1).createProduct(
        product.name, product.image, product.price, 0, product.categoryId
      )).to.be.revertedWith('Product quantity must be greater than zero');

      await expect(store.connect(addr1).createProduct(
        product.name, product.image, product.price, product.quantity, 10
      )).to.be.revertedWith('Category does not exist');
    });


    it('should add product', async () => {
      let transaction = await store.connect(addr1).createProduct(
        product.name, product.image, product.price, product.quantity,0
      )
      await transaction.wait()
      let productCreated = await store.getProduct(0)
      expect(productCreated.name).to.equal(product.name)
      expect(productCreated.image).to.equal(product.image)
      expect(productCreated.price).to.equal(product.price)
      expect(productCreated.quantity).to.equal(product.availableQuantity)
      expect(productCreated.seller).to.equal(addr1.address)
      expect(productCreated.available).to.equal(true)
    });


  });

  describe("Purchasing Products", () => {
    let shopTransaction;
    let productTransaction;

    beforeEach(async () => {
      shopTransaction =  await store.connect(addr1).createStore(shop.name, shop.location)
      await shopTransaction.wait()

      let categoryTransaction = await store.connect(addr1).createCategory(
        category.name, category.description)
      await categoryTransaction.wait()

      productTransaction = await store.connect(addr1).createProduct(
        product.name, product.image, product.price, product.quantity, 0
      )
      await productTransaction.wait()
    });

    it('should not allow to purchase invalid product', async () => {
      await expect(store.connect(addr2).purchaseProducts([10], [1])).to.be.revertedWith('Product does not exist')
      await expect(store.connect(addr1).purchaseProducts([0], [0])).to.be.revertedWith('Quantity must be greater than zero')
      await expect(store.connect(addr1).purchaseProducts([1,1], [1])).to.be.revertedWith('Arrays must have the same length')
      await expect(store.connect(addr1).purchaseProducts([1], [1,1])).to.be.revertedWith('Arrays must have the same length')
    });

    it('should not allow to purchase product with insufficient quantity', async () => {
      await expect(store.connect(addr2).purchaseProducts([0], [11])).to.be.revertedWith('Requested quantity not available')
    });

    it('should purchase product', async () => {
      // let transaction = await store.connect(addr2).purchaseProducts([0], [1])
      //
      // await transaction.wait()
      // let productPurchased = await store.getProduct(0)
      // expect(productPurchased.quantity).to.equal(9)
    });
  });

  describe("Withdrawal", () => {
    let shopTransaction;
    let productTransaction;

    beforeEach(async () => {
      shopTransaction =  await store.connect(addr1).createStore(shop.name, shop.location)
      await shopTransaction.wait()

      categoryTransaction = await store.connect(addr1).createCategory(
        category.name, category.description)
      await categoryTransaction.wait()

      productTransaction = await store.connect(addr1).createProduct(
        product.name, product.image, product.price, product.quantity, 0
      )
      await productTransaction.wait()
    });

    it('should not allow to withdraw if not owner', async () => {
      await expect(store.connect(addr2).withdraw()).to.be.revertedWith('Only owner can call this function')
    });

    it('should withdraw', async () => {
      let transaction = await store.connect(owner).withdraw()
      await transaction.wait()
    });
  });
});
