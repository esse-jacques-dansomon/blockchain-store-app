// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;
import "hardhat/console.sol";

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
    uint256 categoryId;
  }

  // Structure to represent a category
  struct Category {
    uint256 id;
    string name;
    string description;
    address storeOwner;
  }

  // Structure to represent an order
  struct Order {
//    uint256[] productIds; // List of product IDs in the order
//    uint256[] quantities; // List of quantities of each product in the order

    Product product;
    uint256 quantity;
    uint256 totalPrice;
    address buyer;
  }

  struct OrderItem {
    Product product;
    uint256 quantity;
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
  event OrderCreated(Order order);
  event StoreCreated(string name, string location, address owner);
  event ProductCreated(string name, string image, uint256 price, uint256 availableQuantity, address seller);
  event ProductModified(string name, uint256 price, uint256 availableQuantity);

  // Modifier
  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  //validate store data



  // Storage variable for products
  Product[] public products;
  // Mapping to track products of each store
  mapping(address => uint256[]) public storeProducts;

  // Storage variable for categories
  Category[] public categories;
  // Mapping to track categories of each store
  mapping(address => uint256[]) public storeCategories;

  StoreInfo[] public shops;
  // Storage variable for store information
  mapping(address => StoreInfo) public stores;


    // Mapping to track orders
    Order[] public orders;
    mapping(address => uint256[]) public storeOrders;
    //mapping order to buyer
    mapping(address => uint256[]) public buyerOrders;


  // Mapping to track order items

  // Variable to manage order IDs
  uint256 public nextOrderId;

  // Function to create a store
  function createStore(string memory _name, string memory _location) public  returns (StoreInfo memory){
    require(bytes(_name).length > 0, "Store name cannot be empty");
    require(bytes(_location).length > 0, "Store location cannot be empty");
    require(stores[msg.sender].owner == address(0), "Store already exists");
    StoreInfo memory newStore = StoreInfo(_name, _location, msg.sender);
    stores[msg.sender] = newStore;
    shops.push(newStore);
    emit StoreCreated(_name, _location, msg.sender);
    return newStore;
  }

  function updateStore(string memory _name, string memory _location) public returns (StoreInfo memory){
    require(bytes(_name).length > 0, "Store name cannot be empty");
    require(bytes(_location).length > 0, "Store location cannot be empty");
    StoreInfo storage store = stores[msg.sender];
    store.name = _name;
    store.location = _location;
    return stores[msg.sender];
  }

  // Function to create a new product in a store
  function createProduct(string memory _name, string memory _image, uint256 _price, uint256 _quantity, uint256 _categoryId) public returns (Product memory) {
    require(bytes(_name).length > 0, "Product name cannot be empty");
    require(bytes(_image).length > 0, "Product image cannot be empty");
    require(_price > 0, "Product price must be greater than zero");
    require(_quantity > 0, "Product quantity must be greater than zero");
    require(stores[msg.sender].owner != address(0), "Store does not exist");
    require(_categoryId < categories.length, "Category does not exist");
    require(categories[_categoryId].storeOwner == msg.sender, "Category does not belong to this store");
    uint256 productId = products.length;
    Product memory newProduct = Product(productId, _name, _image, _price, _quantity, msg.sender, true, _categoryId);
    products.push(newProduct);
    storeProducts[msg.sender].push(productId);
    emit ProductCreated(_name, _image, _price, _quantity, msg.sender);
    return newProduct;
  }

  // Function to modify an existing product
  function modifyProduct(uint256 _productId, string memory _newName, uint256 _newPrice, uint256 _newQuantity, uint256 _categoryId) public  returns (Product memory){
    Product storage product = products[_productId];
    require(msg.sender == product.seller, "You are not authorized to modify this product");
    require(_categoryId < categories.length, "Category does not exist");
    require(categories[_categoryId].storeOwner == msg.sender, "Category does not belong to this store");
    product.name = _newName;
    product.price = _newPrice;
    product.availableQuantity = _newQuantity;
    product.categoryId = _categoryId;
    emit ProductModified(_newName, _newPrice, _newQuantity);
    return products[_productId];
  }

  // Function to delete a product
  function deleteProduct(uint256 _productId) public {
    Product storage product = products[_productId];
    require(msg.sender == product.seller, "You are not authorized to delete this product");
    product.available = false;
  }

  // Function to create a new category
  function createCategory(string memory _name, string memory _description) public {
    require(bytes(_name).length > 0, "Category name cannot be empty");
    require(bytes(_description).length > 0, "Category description cannot be empty");
    require(stores[msg.sender].owner != address(0), "Store does not exist");
    uint256 categoryId = categories.length;
    Category memory newCategory = Category(categoryId, _name, _description, msg.sender);
    categories.push(newCategory);
    storeCategories[msg.sender].push(categoryId);
  }


  // Function to update a category
  function updateCategory(uint256 _categoryId, string memory _newName, string memory _newDescription) public  returns (Category memory){
    Category storage category = categories[_categoryId];
    require(msg.sender == category.storeOwner, "You are not authorized to modify this category");
    category.name = _newName;
    category.description = _newDescription;
    return categories[_categoryId];
  }

  //Function to order product
  function orderProduct(uint256 _productId, uint256 _quantity) public payable {
    //the app unit is in ether
    Product storage product = products[_productId];
    require(product.availableQuantity >= _quantity, "Requested quantity not available");
    require(product.available, "Product is no longer available");
    uint256 totalPrice = (product.price * _quantity ) ;
    //convert to wei

    console.log("Total Price: ", totalPrice);
    console.log("msg.value: ", msg.value);
    console.log("Product Price: ", product.price);
    console.log("Product Quantity: ", product.availableQuantity);

  //make sure the buyer has enough funds in their wallet; ETH is the default currency
    require(msg.value >= totalPrice, "Insufficient funds to purchase this product");
    Order memory newOrder = Order(product, _quantity, totalPrice, msg.sender);
    orders.push(newOrder);
    storeOrders[product.seller].push(orders.length - 1);
    buyerOrders[msg.sender].push(orders.length - 1);

    // Transfer total amount to seller
    address payable seller = payable(product.seller);
    seller.transfer(totalPrice);

    // Transfer Commission to the owner
//    address payable owner = payable(owner);
//    owner.transfer(product.price * _quantity * 10 / 100);

    // Update product quantity
    product.availableQuantity -= _quantity;
    if (product.availableQuantity == 0) {
      product.available = false;
    }

    emit OrderCreated(newOrder);
  }

  // Function to purchase products
//  function purchaseProducts(uint256[] memory _productIds, uint256[] memory _quantities) public payable {
//    require(_productIds.length == _quantities.length, "Arrays must have the same length");
//
//    uint256 totalPrice;
//    for (uint256 i = 0; i < _productIds.length; i++) {
//      uint256 productId = _productIds[i];
//      uint256 quantity = _quantities[i];
//      require(quantity > 0, "Quantity must be greater than zero");
//      require(productId < products.length, "Product does not exist");
//
//      Product storage product = products[productId];
//      require(product.available, "One or more products are no longer available");
//      require(quantity <= product.availableQuantity, "Requested quantity not available");
//
//      totalPrice += product.price * quantity;
//      product.availableQuantity -= quantity;
//
//      if (product.availableQuantity == 0) {
//        product.available = false;
//      }
//    }
//
//    require(msg.value >= totalPrice, "Insufficient funds to purchase these products");
//
//    // Transfer total amount to sellers
//    for (uint256 i = 0; i < _productIds.length; i++) {
//      uint256 productId = _productIds[i];
//      uint256 quantity = _quantities[i];
//      address payable seller = payable(products[productId].seller);
//      seller.transfer(products[productId].price * quantity);
//    }
//
//    // Create a new order
//    Order memory newOrder = Order(_productIds, _quantities, msg.sender, totalPrice, true);
//    orders[nextOrderId] = newOrder;
//    nextOrderId++;
//
//    emit ProductSold(_productIds, _quantities, msg.sender);
//  }

  // Function to get store information
  function getStore(address _owner) public view returns (StoreInfo memory) {
    StoreInfo memory info = stores[_owner];
    require(info.owner != address(0), "Store does not exist");
    return info;
  }

  // Function to get categories of a store
  function getStoreCategories(address _owner) public view returns (Category[] memory) {
    uint256[] memory cats = storeCategories[_owner];
    Category[] memory storeCategoriesList = new Category[](cats.length);
    for (uint i = 0; i < cats.length; i++) {
      storeCategoriesList[i] = categories[cats[i]];
    }
    return storeCategoriesList;
  }

  // Function to get orders of a store
  function getStoreOrders(address _owner) public view returns (Order[] memory) {
    uint256[] memory orderIds = storeOrders[_owner];
    Order[] memory storeOrdersList = new Order[](orderIds.length);
    for (uint i = 0; i < orderIds.length; i++) {
      storeOrdersList[i] = orders[orderIds[i]];
    }
    return storeOrdersList;
  }

  // Function to get orders of a buyer
  function getBuyerOrders(address _buyer) public view returns (Order[] memory) {
    uint256[] memory orderIds = buyerOrders[_buyer];
    Order[] memory buyerOrdersList = new Order[](orderIds.length);
    for (uint i = 0; i < orderIds.length; i++) {
      buyerOrdersList[i] = orders[orderIds[i]];
    }
    return buyerOrdersList;
  }


  // Function to get store products
  function getStoreProducts(address _owner) public view returns (Product[] memory) {
    uint256[] memory productsId  =   storeProducts[_owner];
    Product[] memory storeProductsList = new Product[](productsId.length);
    for (uint i = 0; i < productsId.length; i++) {
      storeProductsList[i] = products[productsId[i]];
    }
    return storeProductsList;
  }


  // Withdraw funds from the contract
  function withdraw() public onlyOwner {
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send ether");
  }

}
