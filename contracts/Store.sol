// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

contract Store {
  address public owner;
  constructor() {
    owner = msg.sender;
  }
  // Structure to represent a product
  struct Product {
    uint256 id;
    string name;
    string image;
    uint256 price;
    uint256 availableQuantity;
    address seller;
    bool available;
  }


  // Structure to represent an order
  struct Order {
    uint256[] productIds; // List of product IDs in the order
    uint256[] quantities; // List of quantities of each product in the order
    address buyer;
    uint256 totalPrice;
    bool paid;
  }

  // Structure to represent a store
  struct StoreInfo {
    string name;
    string location;
    address owner;
  }

  // Event triggered when a product is sold
  event ProductSold(uint256[] productIds, uint256[] quantities, address buyer);
  event StoreCreated(string name, string location, address owner);
  event ProductCreated(string name, string image, uint256 price, uint256 availableQuantity, address seller);
  event ProductModified(string name, uint256 price, uint256 availableQuantity);

  // Modifier
  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }


  // Storage variable for products
  Product[] public products;

  // Storage variable for store information
  mapping(address => StoreInfo) public stores;

  // Mapping to track products of each store
  mapping(address => uint256[]) public storeProducts;

  // Mapping to track orders
  mapping(uint256 => Order) public orders;

  // Variable to manage order IDs
  uint256 public nextOrderId;

  // Function to create a store
  function createStore(string memory _name, string memory _location) public {
    require(bytes(_name).length > 0, "Store name cannot be empty");
    require(bytes(_location).length > 0, "Store location cannot be empty");
    require(stores[msg.sender].owner == address(0), "Store already exists");
    StoreInfo memory newStore = StoreInfo(_name, _location, msg.sender);
    stores[msg.sender] = newStore;
    emit StoreCreated(_name, _location, msg.sender);
  }

  // Function to create a new product in a store
  function createProduct(string memory _name, string memory _image, uint256 _price, uint256 _quantity) public {
    require(bytes(_name).length > 0, "Product name cannot be empty");
    require(bytes(_image).length > 0, "Product image cannot be empty");
    require(_price > 0, "Product price must be greater than zero");
    require(_quantity > 0, "Product quantity must be greater than zero");
    require(stores[msg.sender].owner != address(0), "Store does not exist");
    uint256 productId = products.length;
    Product memory newProduct = Product(productId, _name, _image, _price, _quantity, msg.sender, true);
    products.push(newProduct);
    storeProducts[msg.sender].push(productId);
    emit ProductCreated(_name, _image, _price, _quantity, msg.sender);
  }

  // Function to modify an existing product
  function modifyProduct(uint256 _productId, string memory _newName, uint256 _newPrice, uint256 _newQuantity) public {
    Product storage product = products[_productId];
    require(msg.sender == product.seller, "You are not authorized to modify this product");
    product.name = _newName;
    product.price = _newPrice;
    product.availableQuantity = _newQuantity;
    emit ProductModified(_newName, _newPrice, _newQuantity);
  }

  // Function to purchase products
  function purchaseProducts(uint256[] memory _productIds, uint256[] memory _quantities) public payable {
    require(_productIds.length == _quantities.length, "Arrays must have the same length");

    uint256 totalPrice;
    for (uint256 i = 0; i < _productIds.length; i++) {
      uint256 productId = _productIds[i];
      uint256 quantity = _quantities[i];
      require(quantity > 0, "Quantity must be greater than zero");
      require(productId < products.length, "Product does not exist");

      Product storage product = products[productId];
      require(product.available, "One or more products are no longer available");
      require(quantity <= product.availableQuantity, "Requested quantity not available");

      totalPrice += product.price * quantity;
      product.availableQuantity -= quantity;

      if (product.availableQuantity == 0) {
        product.available = false;
      }
    }

    require(msg.value >= totalPrice, "Insufficient funds to purchase these products");

    // Transfer total amount to sellers
    for (uint256 i = 0; i < _productIds.length; i++) {
      uint256 productId = _productIds[i];
      uint256 quantity = _quantities[i];
      address payable seller = payable(products[productId].seller);
      seller.transfer(products[productId].price * quantity);
    }

    // Create a new order
    Order memory newOrder = Order(_productIds, _quantities, msg.sender, totalPrice, true);
    orders[nextOrderId] = newOrder;
    nextOrderId++;

    emit ProductSold(_productIds, _quantities, msg.sender);
  }

  // Function to get store information
  function getStore(address _owner) public view returns (StoreInfo memory) {
    StoreInfo memory info = stores[_owner];
    require(info.owner != address(0), "Store does not exist");
    return info;
  }

  // Function to get product information
  function getProduct(uint256 _productId) public view returns (Product memory product) {
    Product memory product = products[_productId];
    return product;
  }

  // Function to get store products
  function getStoreProducts(address _owner) public view returns (uint256[] memory) {
    return storeProducts[_owner];
  }

  // Function to get order information
  function getOrder(uint256 _orderId) public view returns (Order memory order) {
    Order memory order = orders[_orderId];
    return order;
  }

  // Withdraw funds from the contract
  function withdraw() public onlyOwner {
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send ether");
  }


}
