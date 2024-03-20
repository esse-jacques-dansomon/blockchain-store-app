// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9 <0.9.0;

/*
 * @title Dappazon
 * @dev The Dappazon contract is a simple contract that represents an online store.
 */
contract Dappazon {
  //contract name
  string public name;
  //contract owner
  address public owner;

  //product structure
  struct Product {uint256 id;string name;string category;string description;string image;uint256 cost;uint256 stock;uint256 rating;}
  //order structure
  struct Order {
    uint256 id;
    uint256 timestamp;
    Product product;
  }

  //products list
  mapping(uint256 => Product) public products;
  //orders counter
  mapping(address => uint256) public ordersCounter;
  //orders list
  mapping(address => mapping(uint256 => Order)) public orders;

  //events
  event ProductAdded(uint256 id, string name, string category, string description, string image, uint256 cost, uint256 stock, uint256 rating);
  event ProductRemoved(uint256 id);
  event ProductUpdated(uint256 id, string name, string category, string description, string image, uint256 cost, uint256 stock, uint256 rating);
  event ProductBought(uint256 id, uint256 quantity);
  event FundsWithdrawn(uint256 amount);
  event OwnershipTransferred(address newOwner);

  //modifiers

  //only owner
  modifier onlyOwner() {
    require(msg.sender == owner, "You are not the owner");
    _;
  }

  //only if the product exists
  modifier productExists(uint256 _id) {
    require(products[_id].id != 0, "Product does not exist");
    _;
  }

  //only if the product is in stock
  modifier productInStock(uint256 _id, uint256 _quantity) {
    require(products[_id].stock >= _quantity, "Product is out of stock");
    _;
  }

  //only if the product is not in stock
  modifier productNotInStock(uint256 _id, uint256 _quantity) {
    require(products[_id].stock < _quantity, "Product is in stock");
    _;
  }




  constructor() {
    //set the contract name
    name = "Dappazon";
    //set the contract owner
    owner = msg.sender;
  }

  //Add products
  function addProduct(
    uint256 _id,
    string memory _name,
    string memory _category,
    string memory _description,
    string memory _image,
    uint256 _cost,
    uint256 _stock,
    uint256 _rating
  ) public {

    //create a new product
    Product memory product = Product(_id, _name, _category, _description, _image, _cost, _stock, _rating);

    //add the product to the products list
    products[_id] = product;

    //emit the ProductAdded event
    emit ProductAdded(_id, _name, _category, _description, _image, _cost, _stock, _rating);
  }

  //Get product by id
  function getProductById(uint256 _id) productExists(_id) public view returns (Product memory) {
    return products[_id];
  }

  //Buy products
  function buyProduct(uint256 _id, uint256 _quantity) public payable {
    //Fetch product
    Product memory product = getProductById(_id);
    //Create order
    Order memory order = Order(block.timestamp, _quantity, product);
    //Add order to orders list
    ordersCounter[msg.sender]++;
    orders[msg.sender][ordersCounter[msg.sender]] = order;
    //Update stock
    products[_id].stock -= _quantity;
    //Emit ProductBought event
    emit ProductBought(_id, _quantity);
  }

  //Withdraw funds
  function withdrawFunds() public onlyOwner {
    //Transfer funds to the owner
    (bool success, ) = payable(owner).call{value: address(this).balance}("");
    require(success, "Transfer failed.");
    //Emit FundsWithdrawn event
    emit FundsWithdrawn(address(this).balance);
  }

  //Fallback function
  fallback() external {
    revert();
  }

  //Get contract balance
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }




}
