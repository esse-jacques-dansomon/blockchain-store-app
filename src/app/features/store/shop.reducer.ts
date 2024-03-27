import {Category} from "../../data/models/category";
import {Product} from "../../data/models/product";
import {Shop} from "../../data/models/shop";
import {User} from "../../data/models/user";
import {ShopActions, ShopActionTypes} from "./shop.action";
import {Order} from "../../data/models/order";

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


    default:
      return state;
  }
}
