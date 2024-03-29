import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, switchMap} from "rxjs";
import {loadVendor, ShopActionTypes} from "./shop.action";
import {Shop} from "../../../data/models/shop";
import {Category} from "../../../data/models/category";
import {Product} from "../../../data/models/product";
import {ShopContractService} from "../../../data/services/shop-contract.service";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {ShopStoreService} from "./shop-store.service";

@Injectable()
export class ShopEffects {

     loadShop$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.SelectShop),
        exhaustMap((action: any) =>
          this.shopContractService.getShop(action.shopId).then(
            (shop: Shop) => {
              return {
                type: ShopActionTypes.SelectShopSuccess,
              shop
              };
            },
            (error) => {
              return {
                type: ShopActionTypes.SelectShopFailure,
                error,
              };
            }
          )
        )
      )
    );

     createShop$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.CreateShop),
        exhaustMap((action: {shop: Shop}) =>
          this.shopContractService.createShop(action.shop).then(
            (shop) => {
              return {
                type: ShopActionTypes.CreateShopSuccess,
                shop
              };
            },
            (error) => {
              return {
                type: ShopActionTypes.CreateShopFailure,
                error,
              };
            }
          )
        )
      )
    );

     updateShop$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.UpdateShop),
        exhaustMap((action: any) => {
          let shop = action.shop;
          return   this.shopContractService.updateShop(action.shop).then(
              () => {
                return {
                  type: ShopActionTypes.UpdateShopSuccess,
                  shop
                };
              },
              (error) => {
                return {
                  type: ShopActionTypes.UpdateShopFailure,
                  error,
                };
              }
            )
          }
        )
      )
    );


     loadShopCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.LoadCategories),
        exhaustMap((action: any) =>
          this.shopContractService.getStoreCategories(action.shopId).then(
            (categories: Category[]) => {
              return {
                type: ShopActionTypes.LoadCategoriesSuccess,
                categories,
              };
            },
            (error) => {
              return {
                type: ShopActionTypes.LoadCategoriesFailure,
                error,
              };
            }
          )
        )
      )
    );

    createCategory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.CreateCategory),
        exhaustMap((action: any) =>
          this.shopContractService.createCategory(action.category).then(
            () => {
              this.shopStoreService.selectAccount$().pipe(
                switchMap((user: any) => {
                  this.shopStoreService.loadShopCategories(user!)
                  return user
                })
              ).subscribe(
              )
              let category = action.category;
              return {
                type: ShopActionTypes.CreateCategorySuccess,
                category
              };
            },
            (error) => {
              console.log(error)
              return {
                type: ShopActionTypes.CreateCategoryFailure,
                error,
              };
            }
          )
        )
      )
    );


    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
          ofType(ShopActionTypes.UpdateCategory),
          exhaustMap((action: any) => {
            let category = action.category;
            return   this.shopContractService.updateCategory(action.category).then(
                (data) => {
                  this.snackBarService.openSnackBar('Category detail updated!');
                  return {
                    type: ShopActionTypes.UpdateCategorySuccess,
                    category
                  };
                },
                (error) => {
                  this.snackBarService.openSnackBar('Error updating category detail!' + error);
                  return {
                    type: ShopActionTypes.UpdateCategoryFailure,
                    error,
                  };
                }
              )
            }
          )
        )
    );


     loadShopProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.LoadProducts),
        exhaustMap((action:any) =>
          this.shopContractService.getStoreProducts(action.shopId).then(
            (products: Product[]) => {
              return {
                type: ShopActionTypes.LoadProductsSuccess,
                products,
              };
            },
            (error) => {
              return {
                type: ShopActionTypes.LoadProductsFailure,
                error,
              };
            }
          )
        )
      )
      );

      createProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.CreateProduct),
        exhaustMap((action: {product: Product}) =>
          this.shopContractService.createProduct(action.product).then(
            (product) => {
              this.shopStoreService.selectAccount$().pipe(
                switchMap((user: any) => {
                  this.shopStoreService.loadShopProducts(user!)
                  return user
                })
              ).subscribe(
              )
              this.snackBarService.openSnackBar('Product detail updated!');
              return {
                type: ShopActionTypes.CreateProductSuccess,
                product
              };
            },
            (error) => {
              this.snackBarService.openSnackBar('Error updating product detail!' + error.message);
              return {
                type: ShopActionTypes.CreateProductFailure,
                error,
              };
            }
          )
        )
       )
      );


      updateProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.UpdateProduct),
        exhaustMap((action: any) => {
          let product = action.product;
          return   this.shopContractService.updateProduct(action.product).then(
              () => {
                return {
                  type: ShopActionTypes.UpdateProductSuccess,
                  product
                };
              },
              (error) => {
                return {
                  type: ShopActionTypes.UpdateProductFailure,
                  error,
                };
              }
            )
          }
        )
      )
    );

    login = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.Login),
      exhaustMap((action) =>
        this.shopContractService.getAccount().then(
          (user: any) => {
            return {
              type: ShopActionTypes.LoginSuccess,
              user
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.LoginFailure,
              error,
            };
          }
        )
      )
    )
    );

    loadVendorShop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.LoadVendor),
      exhaustMap((action: any) =>
        this.shopContractService.getShop(action.shopId).then(
          (shop: Shop) => {
            return {
              type: ShopActionTypes.LoadVendorSuccess,
              shop
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.LoadVendorFailure,
              error,
            };
          }
        )
      )
    )
    );

    loadVendorCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.LoadVendorCategories),
      exhaustMap((action:any) =>
        this.shopContractService.getStoreCategories(action.shopId).then(
          (categories: Category[]) => {
            return {
              type: ShopActionTypes.LoadVendorCategoriesSuccess,
              categories,
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.LoadVendorCategoriesFailure,
              error,
            };
          }
        )
      )
    )
    );

    loadVendorProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.LoadVendorProducts),
      exhaustMap((action: any) =>
        this.shopContractService.getStoreProducts(action.shopId).then(
          (products: Product[]) => {
            return {
              type: ShopActionTypes.LoadVendorProductsSuccess,
              products,
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.LoadVendorProductsFailure,
              error,
            };
          }
        )
      )
    )
    );

    createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.CreateOrder),
      exhaustMap((action: any) =>
        this.shopContractService.orderProduct(action.product, action.quantity).then(
          (order) => {
            return {
              type: ShopActionTypes.CreateOrderSuccess,
              order
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.CreateOrderFailure,
              error,
            };
          }
        )
      )
    )
    );

  loadStoreOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.LoadOrders),
      exhaustMap((action: any) =>
        this.shopContractService.getStoreOrders(action.userId).then(
          (orders: any) => {
            return {
              type: ShopActionTypes.LoadOrdersSuccess,
              orders,
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.LoadOrdersFailure,
              error,
            };
          }
        )
      )
    )
    );

  loadUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActionTypes.LoadOrdersByUser),
      exhaustMap((action: any) =>
        this.shopContractService.getStoreOrders(action.userId).then(
          (orders: any) => {
            return {
              type: ShopActionTypes.LoadOrdersByUserSuccess,
              orders,
            };
          },
          (error) => {
            return {
              type: ShopActionTypes.LoadOrdersByUserFailure,
              error,
            };
          }
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shopContractService: ShopContractService,
    private snackBarService: SnackBarService,
    private shopStoreService: ShopStoreService
  ) {}

}
