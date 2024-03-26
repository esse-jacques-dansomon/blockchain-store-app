import {createAction, props, Store} from "@ngrx/store";
import {User} from "../../data/user";
import {Category} from "../../data/category";
import {Product} from "../../data/product";
import {Shop} from "../../data/shop";
import {Order} from "../../data/order";

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

  LoadCategories = '[Shop] Load categories by shop',
  LoadCategoriesSuccess = '[Shop] Load categories Success by shop',
  LoadCategoriesFailure = '[Shop] Load categories Failure by shop',

  LoadProducts = '[Shop] Load products by shop',
  LoadProductsSuccess = '[Shop] Load products Success by shop',
  LoadProductsFailure = '[Shop] Load products Failure by shop',

  SelectCategory = '[Shop] Select category by shop',
  SelectCategorySuccess = '[Shop] Select category Success by shop',
  SelectCategoryFailure = '[Shop] Select category Failure by shop',
}



// Load Shops
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

// Login
export const login = createAction(
  ShopActionTypes.Login,
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  ShopActionTypes.LoginSuccess,
  props<{ user: User }>()
);

export const loginFailure = createAction(
  ShopActionTypes.LoginFailure,
  props<{ error: any }>()
);

// Load Orders
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

// Select Shop
export const selectShop = createAction(
  ShopActionTypes.SelectShop,
  props<{ shopId: number }>()
);

export const selectShopSuccess = createAction(
  ShopActionTypes.SelectShopSuccess,
  props<{ shop: Shop }>()
);

export const selectShopFailure = createAction(
  ShopActionTypes.SelectShopFailure,
  props<{ error: any }>()
);

// Load Categories
export const loadCategories = createAction(
  ShopActionTypes.LoadCategories,
  props<{ shopId: number }>()
);

export const loadCategoriesSuccess = createAction(
  ShopActionTypes.LoadCategoriesSuccess,
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  ShopActionTypes.LoadCategoriesFailure,
  props<{ error: any }>()
);

// Load Products
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

// Select Category
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



export type ShopActions =
  ReturnType<typeof loadShops> |
  ReturnType<typeof loadShopsSuccess> |
  ReturnType<typeof loadShopsFailure> |

  ReturnType<typeof login> |
  ReturnType<typeof loginSuccess> |
  ReturnType<typeof loginFailure> |

  ReturnType<typeof loadOrders> |
  ReturnType<typeof loadOrdersSuccess> |
  ReturnType<typeof loadOrdersFailure> |

  ReturnType<typeof selectShop> |
  ReturnType<typeof selectShopSuccess> |
  ReturnType<typeof selectShopFailure> |

  ReturnType<typeof loadCategories> |
  ReturnType<typeof loadCategoriesSuccess> |
  ReturnType<typeof loadCategoriesFailure> |

  ReturnType<typeof loadProducts> |
  ReturnType<typeof loadProductsSuccess> |
  ReturnType<typeof loadProductsFailure> |

  ReturnType<typeof selectCategory> |
  ReturnType<typeof selectCategorySuccess> |
  ReturnType<typeof selectCategoryFailure>;
