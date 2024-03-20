const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokens = (n) => ethers.utils.parseUnits(n.toString(), "ether");

describe("Dappazon",  () => {

  let dappazon;
  let deployer, buyer;

  beforeEach(async () => {
    //setup a contract
    [deployer, buyer] = await ethers.getSigners();

    //deploy the contract
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
    await dappazon.deployed();
  })

  describe("Deployment", () => {
    it('should set owner', async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });
    it("Should have a name", async () => {
      expect(await dappazon.name()).to.equal("Dappazon");
    })
  })

  describe("Products", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).addProduct(
        1,
        "Iphone 12",
        "Technology",
        "The iphone 12 is the latest phone from Apple",
        "https://www.apple.com/iphone-12/",
        tokens(2),
        20,
        4)

      await transaction.wait();
    })

    it('should add a product', async () => {
      const product = await dappazon.products(1);
      expect(product.id).to.equal(1);
      expect(product.name).to.equal("Iphone 12");
      expect(product.category).to.equal("Technology");
      expect(product.description).to.equal("The iphone 12 is the latest phone from Apple");
      expect(product.image).to.equal("https://www.apple.com/iphone-12/");
      expect(product.cost).to.equal(tokens(2));
      expect(product.stock).to.equal(20);
    })

    it('should emit productAdded', () => {
      expect(transaction).to.emit(dappazon, "ProductAdded").withArgs(
        1,
        "Iphone 12",
        "Technology",
        "The iphone 12 is the latest phone from Apple",
        "https://www.apple.com/iphone-12/",
        tokens(2),
        20,
        4);
    });

  })

  describe("Buy", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).addProduct(
        1,
        "Iphone 12",
        "Technology",
        "The iphone 12 is the latest phone from Apple",
        "https://www.apple.com/iphone-12/",
        tokens(2),
        20,
        4)

      await transaction.wait();

      transaction = await dappazon.connect(buyer).buyProduct(1 ,2, {value: tokens(4)});
      await transaction.wait();

    })

    it('should update contract const', async () => {
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(tokens(4));
    })

    it('should update product stock', async () => {
      const product = await dappazon.products(1);
      expect(product.stock).to.equal(18);
    })

    it('Should update buyer\'s order count', async () => {
      const result = await dappazon.ordersCounter(buyer.address);
      expect(result).to.equal(1);
    })

    it('Should add order', async () => {
      const order = await dappazon.orders(buyer.address, 1);
      expect(order.product.id).to.equal(1);
    })
  })


  describe("Withdraw", () => {
    let balanceBefore, balanceAfter, balanceWithdrawn;

    beforeEach(async () => {
      let transaction = await dappazon.connect(deployer).addProduct(
        1,
        "Iphone 12",
        "Technology",
        "The iphone 12 is the latest phone from Apple",
        "https://www.apple.com/iphone-12/",
        tokens(2),
        20,
        4)

      await transaction.wait();

      transaction = await dappazon.connect(buyer).buyProduct(1 ,2, {value: tokens(4)});
      await transaction.wait();

      balanceBefore = await ethers.provider.getBalance(deployer.address);

      transaction = await dappazon.connect(deployer).withdrawFunds();
      await transaction.wait();

      balanceAfter = await ethers.provider.getBalance(deployer.address);
    });


    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(dappazon.address)
      expect(result).to.equal(0)
    });
  })



})
