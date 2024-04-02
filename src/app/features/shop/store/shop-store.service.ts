import { Injectable } from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {
  createCategory, createOrder,
  createProduct, createShop,
  loadCategories, loadOrders, loadOrdersByUser,
  loadProducts,
  loadShops, loadVendor, loadVendorCategories, loadVendorProducts,
  login,
  selectShop,
  updateCategory,
  updateProduct, updateShop
} from "./shop.action";
import {Product} from "../../../data/models/product";

@Injectable({
  providedIn: 'root'
})
export class ShopStoreService {
    private readonly store: Store<AppState>;


    constructor(store: Store<AppState>) {
      this.store = store;
    }


    selectIsLoading$ = () => this.store.select(state => state.shop.isLoading);
    selectError$ = () => this.store.select(state => state.shop.error);


    loadShops() {this.store.dispatch(loadShops());}
    selectShops$ = () => this.store.select(state => state.shop.shopState.shops);
    loadShopOrders = (shopId: any) => this.store.dispatch(loadOrders({userId: shopId}));

    loadShop = (shopId: any) => this.store.dispatch(selectShop({shopId}));
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
    loadShopCategories = (shopId: any) => this.store.dispatch(loadCategories({shopId}));
    selectSelectedShopCategories$ = () => this.store.select(state => state.shop.shopState.categories);



    loadShopProducts = (shopId: any) => this.store.dispatch(loadProducts({shopId}));
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

    loadVendorShop = (shopOwner: any) => this.store.dispatch(loadVendor({shopId: shopOwner}));
    loadVendorCategories = (shopOwner: any) => this.store.dispatch(loadVendorCategories({shopId: shopOwner}));
    loadVendorProducts = (shopOwner: any) => this.store.dispatch(loadVendorProducts({shopId: shopOwner}));

    selectVendorCategories$ = () => this.store.select(state => state.shop.vendor.vendorCategories);
    selectVendorProducts$ = () => this.store.select(state => state.shop.vendor.vendorProducts);
     selectVendorShop$ = () => this.store.select(state => state.shop.vendor.vendorShop);

      orderProduct = (product: Product, qte: number) => this.store.dispatch(createOrder({product: product, quantity: qte}));
      loadUserOrders = (userId: any) => this.store.dispatch(loadOrdersByUser({userId: userId}));
      selectUserOrders$ = () => this.store.select(state => state.shop.authState.orders);
      selectShopOrders$ = () => this.store.select(state => state.shop.orderState.orders);

}
