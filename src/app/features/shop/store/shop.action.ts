import {createAction, props, Store} from "@ngrx/store";
import {User} from "../../../data/models/user";
import {Category} from "../../../data/models/category";
import {Product} from "../../../data/models/product";
import {Shop} from "../../../data/models/shop";
import {Order} from "../../../data/models/order";

export enum ShopActionTypes {
  LoadShops = '[Shop] Load Shops',
  LoadShopsSuccess = '[Shop] Load Shops Success',
  LoadShopsFailure = '[Shop] Load Shops Failure',

  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',

  LoadOrders = '[Shop] Load orders',
  LoadOrdersSuccess = '[Shop] Load orders Success',
  LoadOrdersFailure = '[Shop] Load orders Failure',

  SelectShop = '[Shop] Select Shop',
  SelectShopSuccess = '[Shop] Select Shop Success',
  SelectShopFailure = '[Shop] Select Shop Failure',

  CreateShop = '[Shop] Create Shop',
  CreateShopSuccess = '[Shop] Create Shop Success',
  CreateShopFailure = '[Shop] Create Shop Failure',

  UpdateShop = '[Shop] Update Shop',
  UpdateShopSuccess = '[Shop] Update Shop Success',
  UpdateShopFailure = '[Shop] Update Shop Failure',

  LoadCategories = '[Shop] Load categories by shop',
  LoadCategoriesSuccess = '[Shop] Load categories Success by shop',
  LoadCategoriesFailure = '[Shop] Load categories Failure by shop',

  CreateCategory = '[Shop] Create category by shop',
  CreateCategorySuccess = '[Shop] Create category Success by shop',
  CreateCategoryFailure = '[Shop] Create category Failure by shop',

  UpdateCategory = '[Shop] Update category by shop',
  UpdateCategorySuccess = '[Shop] Update category Success by shop',
  UpdateCategoryFailure = '[Shop] Update category Failure by shop',

  LoadProducts = '[Shop] Load products by shop',
  LoadProductsSuccess = '[Shop] Load products Success by shop',
  LoadProductsFailure = '[Shop] Load products Failure by shop',

  CreateProduct= '[Shop] Create products by shop',
  CreateProductSuccess = '[Shop] Create products Success by shop',
  CreateProductFailure = '[Shop] Create products Failure by shop',

  UpdateProduct = '[Shop] Update Product by shop',
  UpdateProductSuccess = '[Shop] Update Product Success by shop',
  UpdateProductFailure = '[Shop] Update Product Failure by shop',


  SelectCategory = '[Shop] Select category by shop',
  SelectCategorySuccess = '[Shop] Select category Success by shop',
  SelectCategoryFailure = '[Shop] Select category Failure by shop',


  LoadVendor = '[Shop] Load Vendor',
  LoadVendorSuccess = '[Shop] Load Vendor Success',
  LoadVendorFailure = '[Shop] Load Vendor Failure',

  LoadVendorCategories = '[Shop] Load Vendor Categories',
  LoadVendorCategoriesSuccess = '[Shop] Load Vendor Categories Success',
  LoadVendorCategoriesFailure = '[Shop] Load Vendor Categories Failure',

  LoadVendorProducts = '[Shop] Load Vendor Products',
  LoadVendorProductsSuccess = '[Shop] Load Vendor Products Success',
  LoadVendorProductsFailure = '[Shop] Load Vendor Products Failure',
}


/**
 * Load Shops, Success, Failure
 */
export const loadShops = createAction(
  ShopActionTypes.LoadShops
);

export const loadShopsSuccess = createAction(
  ShopActionTypes.LoadShopsSuccess,
  props<{ shops: Shop[] }>()
);

export const loadShopsFailure = createAction(
  ShopActionTypes.LoadShopsFailure,
  props<{ error: any }>()
);


/**
 * Login, Success, Failure
 */
export const login = createAction(
  ShopActionTypes.Login,
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  ShopActionTypes.LoginSuccess,
  props<{ user: string }>()
);

export const loginFailure = createAction(
  ShopActionTypes.LoginFailure,
  props<{ error: any }>()
);



/**
 * Load Orders, Success, Failure
 */
export const loadOrders = createAction(
  ShopActionTypes.LoadOrders
);

export const loadOrdersSuccess = createAction(
  ShopActionTypes.LoadOrdersSuccess,
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  ShopActionTypes.LoadOrdersFailure,
  props<{ error: any }>()
);



/**
 * Select Shop, Success, Failure
 */
export const selectShop = createAction(
  ShopActionTypes.SelectShop,
  props<{ shopId: any }>()
);

export const selectShopSuccess = createAction(
  ShopActionTypes.SelectShopSuccess,
  props<{ shop: Shop }>()
);

export const selectShopFailure = createAction(
  ShopActionTypes.SelectShopFailure,
  props<{ error: any }>()
);


/**
 * Create Shop, Success, Failure
 */
export const createShop = createAction(
  ShopActionTypes.CreateShop,
  props<{ shop: Shop }>()
);

export const createShopSuccess = createAction(
  ShopActionTypes.CreateShopSuccess,
  props<{ shop: Shop }>()
);

export const createShopFailure = createAction(
  ShopActionTypes.CreateShopFailure,
  props<{ error: any }>()
);


/**
 * Update Shop, Success, Failure
 */

export const updateShop = createAction(
  ShopActionTypes.UpdateShop,
  props<{ shop: Shop }>()
);

export const updateShopSuccess = createAction(
  ShopActionTypes.UpdateShopSuccess,
  props<{ shop: Shop }>()
);

export const updateShopFailure = createAction(
  ShopActionTypes.UpdateShopFailure,
  props<{ error: any }>()
);


/**
 * load Categories, Success, Failure
 */
export const loadCategories = createAction(
  ShopActionTypes.LoadCategories,
  props<{ shopId: any }>()
);

export const loadCategoriesSuccess = createAction(
  ShopActionTypes.LoadCategoriesSuccess,
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  ShopActionTypes.LoadCategoriesFailure,
  props<{ error: any }>()
);




/**
 * load Product, Success, Failure
 */
export const loadProducts = createAction(
  ShopActionTypes.LoadProducts,
  props<{ shopId: number }>()
);

export const loadProductsSuccess = createAction(
  ShopActionTypes.LoadProductsSuccess,
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  ShopActionTypes.LoadProductsFailure,
  props<{ error: any }>()
);

/**
 * Create Product, Success, Failure
 */

export const createProduct = createAction(
  ShopActionTypes.CreateProduct,
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  ShopActionTypes.CreateProductSuccess,
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  ShopActionTypes.CreateProductFailure,
  props<{ error: any }>()
);


/**
 * Update Product, Success, Failure
 */

export const updateProduct = createAction(
  ShopActionTypes.UpdateProduct,
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  ShopActionTypes.UpdateProductSuccess,
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  ShopActionTypes.UpdateProductFailure,
  props<{ error: any }>()
);



/**
 * Create Category, Success, Failure
 */

export const createCategory = createAction(
  ShopActionTypes.CreateCategory,
  props<{ category: Category }>()
);

export const createCategorySuccess = createAction(
  ShopActionTypes.CreateCategorySuccess,
  props<{ category: Category }>()
);

export const createCategoryFailure = createAction(
  ShopActionTypes.CreateCategoryFailure,
  props<{ error: any }>()
);


/**
 * Update Category, Success, Failure
 */

export const updateCategory = createAction(
  ShopActionTypes.UpdateCategory,
  props<{ category: Category }>()
);

export const updateCategorySuccess = createAction(
  ShopActionTypes.UpdateCategorySuccess,
  props<{ category: Category }>()
);

export const updateCategoryFailure = createAction(
  ShopActionTypes.UpdateCategoryFailure,
  props<{ error: any }>()
);


/**
 * Select Category, Success, Failure
 */
export const selectCategory = createAction(
  ShopActionTypes.SelectCategory,
  props<{ categoryId: number }>()
);

export const selectCategorySuccess = createAction(
  ShopActionTypes.SelectCategorySuccess,
  props<{ categoryId: number }>()
);

export const selectCategoryFailure = createAction(
  ShopActionTypes.SelectCategoryFailure,
  props<{ error: any }>()
);


/**
 * Load Vendor, Success, Failure
 */
export const loadVendor = createAction(
  ShopActionTypes.LoadVendor,
  props<{ shopId: any }>()
);

export const loadVendorSuccess = createAction(
  ShopActionTypes.LoadVendorSuccess,
  props<{ shop: Shop }>()
);

export const loadVendorFailure = createAction(
  ShopActionTypes.LoadVendorFailure,
  props<{ error: any }>()
);


/**
 * Load Vendor Categories, Success, Failure
 */
export const loadVendorCategories = createAction(
  ShopActionTypes.LoadVendorCategories,
  props<{ shopId: any }>()
);

export const loadVendorCategoriesSuccess = createAction(
  ShopActionTypes.LoadVendorCategoriesSuccess,
  props<{ categories: Category[] }>()
);

export const loadVendorCategoriesFailure = createAction(
  ShopActionTypes.LoadVendorCategoriesFailure,
  props<{ error: any }>()
);


/**
 * Load Vendor Products, Success, Failure
 */
export const loadVendorProducts = createAction(
  ShopActionTypes.LoadVendorProducts
);

export const loadVendorProductsSuccess = createAction(
  ShopActionTypes.LoadVendorProductsSuccess,
  props<{ products: Product[] }>()
);

export const loadVendorProductsFailure = createAction(
  ShopActionTypes.LoadVendorProductsFailure,
  props<{ error: any }>()
);





export type ShopActions =
  ReturnType<typeof login> |
  ReturnType<typeof loginSuccess> |
  ReturnType<typeof loginFailure> |

  ReturnType<typeof loadOrders> |
  ReturnType<typeof loadOrdersSuccess> |
  ReturnType<typeof loadOrdersFailure> |



  ReturnType<typeof loadShops> |
  ReturnType<typeof loadShopsSuccess> |
  ReturnType<typeof loadShopsFailure> |

  ReturnType<typeof selectShop> |
  ReturnType<typeof selectShopSuccess> |
  ReturnType<typeof selectShopFailure> |

  ReturnType<typeof createShop> |
  ReturnType<typeof createShopSuccess> |
  ReturnType<typeof createShopFailure> |

  ReturnType<typeof updateShop> |
  ReturnType<typeof updateShopSuccess> |
  ReturnType<typeof updateShopFailure> |




  ReturnType<typeof loadCategories> |
  ReturnType<typeof loadCategoriesSuccess> |
  ReturnType<typeof loadCategoriesFailure> |

  ReturnType<typeof createCategory> |
  ReturnType<typeof createCategorySuccess> |
  ReturnType<typeof createCategoryFailure> |

  ReturnType<typeof updateCategory> |
  ReturnType<typeof updateCategorySuccess> |
  ReturnType<typeof updateCategoryFailure> |

  ReturnType<typeof selectCategory> |
  ReturnType<typeof selectCategorySuccess> |
  ReturnType<typeof selectCategoryFailure>|



  ReturnType<typeof loadProducts> |
  ReturnType<typeof loadProductsSuccess> |
  ReturnType<typeof loadProductsFailure> |

  ReturnType<typeof createProduct> |
  ReturnType<typeof createProductSuccess> |
  ReturnType<typeof createProductFailure> |

  ReturnType<typeof updateProduct> |
  ReturnType<typeof updateProductSuccess> |
  ReturnType<typeof updateProductFailure> |


  ReturnType<typeof loadVendor> |
  ReturnType<typeof loadVendorSuccess> |
  ReturnType<typeof loadVendorFailure> |

  ReturnType<typeof loadVendorCategories> |
  ReturnType<typeof loadVendorCategoriesSuccess> |
  ReturnType<typeof loadVendorCategoriesFailure> |

  ReturnType<typeof loadVendorProducts> |
  ReturnType<typeof loadVendorProductsSuccess> |
  ReturnType<typeof loadVendorProductsFailure>

  ;
