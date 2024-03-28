import {createSelector} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {ShopState} from "./shop.reducer";

class ShopStoreSelector {
  public static selectShopState= (state: AppState) => state.shop;

  public static selectShopLoading = createSelector(
    ShopStoreSelector.selectShopState,
    (shopState: ShopState) => shopState.isLoading
  );

  public static selectShopError = createSelector(
    ShopStoreSelector.selectShopState,
    (shopState: ShopState) => shopState.error
  );

  public static selectProductsState = createSelector(
    ShopStoreSelector.selectShopState,
    (shopState: ShopState) => shopState.shopState.products
  );

  public static selectCategoriesState = createSelector(
    ShopStoreSelector.selectShopState,
    (shopState: ShopState) => shopState.shopState.shops
  );

  public static selectSelectedProduct = createSelector(
    ShopStoreSelector.selectShopState,
    (shopState: ShopState) => shopState.shopState.selectedProduct
  );

  public static selectShops = createSelector(
    ShopStoreSelector.selectShopState,
    (shopState: ShopState) => shopState.shopState.shops
  );

}
