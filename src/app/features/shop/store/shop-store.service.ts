import { Injectable } from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {
  createCategory,
  createProduct, createShop,
  loadCategories,
  loadProducts,
  loadShops,
  login,
  selectShop,
  updateCategory,
  updateProduct, updateShop
} from "./shop.action";

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
    createShop = (value: any) => this.store.dispatch(createShop({shop: value}));
    updateShop = (value: any) => this.store.dispatch(updateShop({shop: value}));



    deleteCategory = (id: number) => this.store.dispatch(updateCategory({
      category: {
        id,
        name: '',
        description: '',
        storeOwner: '',
      }
    }));
    updateCategory = ( id: any, value: any) => this.store.dispatch(updateCategory({category: {
      ...value,id
      }}));
    addCategory = (value: any) => this.store.dispatch(createCategory({category: value}));
    loadShopCategories = (shopId: number) => this.store.dispatch(loadCategories({shopId}));
    selectSelectedShopCategories$ = () => this.store.select(state => state.shop.shopState.categories);



    loadShopProducts = (shopId: number) => this.store.dispatch(loadProducts({shopId}));
    selectSelectedShopProducts$ = () => this.store.select(state => state.shop.shopState.products);
    updateProduct =(id: any, value: any) => this.store.dispatch(updateProduct({product: {
      ...value,id
      }}));
    addProduct = (value: any) => this.store.dispatch(createProduct({product: value}));
    deleteProduct = (id: number) => this.store.dispatch(updateProduct({
      product: {
        id,
        availableQuantity: 0,
        available: false,
        name: '',
        price: 0,
        categoryId: '',
        image: '',
        seller: ''
      }}));



    loadLogin = (user: any) => this.store.dispatch(login({user:  user }));
    selectAccount$ = () => this.store.select(state => state.shop.authState.user);

}
