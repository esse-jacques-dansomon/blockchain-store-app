import {Category} from "../../../data/models/category";
import {Product} from "../../../data/models/product";
import {Shop} from "../../../data/models/shop";
import {ShopActions, ShopActionTypes} from "./shop.action";
import {Order} from "../../../data/models/order";

export interface ShopState {

  // Auth State
  authState: {
    user: string | null;
    token: string | null;

    // categories: Category[] | null;
    // selectedCategory: Category | null;
    //
    // products: Product[] | null;
    // selectedProduct: Product | null;
  }

  // Shop State
  shopState: {

    shops: Shop[] | null;
    selectedShop: Shop | null;

    categories: Category[] | null;
    selectedCategory: Category | null;

    products: Product[] | null;
    selectedProduct: Product | null;
  }

  orderState: {
    orders: Order[] | null;
    selectedOrder: Order | null;
  }

  isLoading: boolean,
  error: any;
}

export const shopInitialState: ShopState = {
  authState: {
    user: null,
    token: null,
  },

  orderState: {
    orders: null,
    selectedOrder: null,
  },

  shopState: {
    shops: null,
    selectedShop: null,

    categories: null,
    selectedCategory: null,

    products: null,
    selectedProduct: null,
  },

  isLoading: false,
  error: null,
}

export const shopFeatureKey = 'shop';


export function shopReducer(state: ShopState, action:ShopActions): ShopState {

  switch (action.type) {
      // Load Shops
      case ShopActionTypes.LoadShops:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.LoadShopsSuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            shops: action.shops,
          },
          isLoading: false,
        };
      case ShopActionTypes.LoadShopsFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      //  Login
      case ShopActionTypes.Login:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.LoginSuccess:
        return {
          ...state,
          authState: {
            ...state.authState,
            user: action.user,
          },
          isLoading: false,
        };
      case ShopActionTypes.LoginFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      // Load Orders
      case ShopActionTypes.LoadOrders:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.LoadOrdersSuccess:
        return {
          ...state,
          orderState: {
            ...state.orderState,
            orders: action.orders,
          },
          isLoading: false,
        };
      case ShopActionTypes.LoadOrdersFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };



      // Select Shop
      case ShopActionTypes.SelectShop:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.SelectShopSuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            selectedShop: action.shop,
          },
          isLoading: false,
        };
      case ShopActionTypes.SelectShopFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
          shopState: {
            ...state.shopState,
            selectedShop: null,
          }
        };

      // Create Shop
      case ShopActionTypes.CreateShop:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.CreateShopSuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            shops: [...state.shopState.shops?? [], action.shop],
          },
          isLoading: false,
        };
      case ShopActionTypes.CreateShopFailure:
        console.log(action.error)
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      // Update Shop
      case ShopActionTypes.UpdateShop:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.UpdateShopSuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            selectedShop: action.shop,
          },
          isLoading: false,
        };
      case ShopActionTypes.UpdateShopFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };


      // Load Categories
      case ShopActionTypes.LoadCategories:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.LoadCategoriesSuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            categories: action.categories,
          },
          isLoading: false,
        };
      case ShopActionTypes.LoadCategoriesFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      // Select Category
      case ShopActionTypes.SelectCategory:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.SelectCategorySuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            selectedCategory: state.shopState.categories?.find(category => category.id === action.categoryId) || null,
          },
          isLoading: false,
        };
      case ShopActionTypes.SelectCategoryFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      // Create Category
      case ShopActionTypes.CreateCategory:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.CreateCategorySuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
          },
          isLoading: false,
        };
      case ShopActionTypes.CreateCategoryFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      // Update Category
      case ShopActionTypes.UpdateCategory:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.UpdateCategorySuccess:

        return {
          ...state,
          shopState: {
            ...state.shopState,
            categories: state.shopState.categories?.map(category => category.id === action.category.id ? action.category : category) ?? null,
          },
          isLoading: false,
        };
      case ShopActionTypes.UpdateCategoryFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };



      // Load Products
      case ShopActionTypes.LoadProducts:
        return {
          ...state,
          isLoading: true,
        };
      case ShopActionTypes.LoadProductsSuccess:
        return {
          ...state,
          shopState: {
            ...state.shopState,
            products: action.products,
          },

          isLoading: false,
        };
      case ShopActionTypes.LoadProductsFailure:
        return {
          ...state,
          error: action.error,
          isLoading: false,
        };

      // Create Product
      case ShopActionTypes.CreateProduct:
          return {
            ...state,
            isLoading: true,
          };
      case ShopActionTypes.CreateProductSuccess:
          return {
            ...state,
            shopState: {
              ...state.shopState,
              products: [...state.shopState.products?? [], action.product],
            },
            isLoading: false,
          };
      case ShopActionTypes.CreateProductFailure:
          return {
            ...state,
            error: action.error,
            isLoading: false,
          };

      // Update Product
      case ShopActionTypes.UpdateProduct:
          return {
            ...state,
            isLoading: true,
          };
      case ShopActionTypes.UpdateProductSuccess:
          return {
            ...state,
            shopState: {
              ...state.shopState,
              products: state.shopState.products?.map(product => product.id === action.product.id ? action.product : product) ?? null,
            },
            isLoading: false,
          };
      case ShopActionTypes.UpdateProductFailure:
          return {
            ...state,
            error: action.error,
            isLoading: false,
          };

    default:
      return state;
  }
}
