import { Injectable } from '@angular/core';
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {loadCategories, loadProducts, loadShops, selectShop} from "./shop.action";

@Injectable({
  providedIn: 'root'
})
export class ShopStoreService {
  private readonly store: Store<AppState>;

  constructor(store: Store<AppState>) {
    this.store = store;
  }

  selectShopLoading$ = () => this.store.select(state => state.shop.isLoading);
  selectShopError$ = () => this.store.select(state => state.shop.error);


  loadShops() {this.store.dispatch(loadShops());}
  selectShops$ = () => this.store.select(state => state.shop.shopState.shops);


  loadShop = (shopId: number) => this.store.dispatch(selectShop({shopId}));
  selectSelectedShop$ = () => this.store.select(state => state.shop.shopState.selectedShop);

  loadShopCategories = (shopId: number) => this.store.dispatch(loadCategories({shopId}));
  selectSelectedShopCategories$ = () => this.store.select(state => state.shop.shopState.categories);


  loadShopProducts = (shopId: number) => this.store.dispatch(loadProducts({shopId}));
  selectSelectedShopProducts$ = () => this.store.select(state => state.shop.shopState.products);


}
