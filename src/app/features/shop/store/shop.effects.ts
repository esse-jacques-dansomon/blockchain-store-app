import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, switchMap} from "rxjs";
import {ShopActionTypes} from "./shop.action";
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
        exhaustMap((action) =>
          this.shopContractService.getShop().then(
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
        exhaustMap((action) =>
          this.shopContractService.getStoreCategories().then(
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
        exhaustMap((action) =>
          this.shopContractService.getProducts().then(
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

  constructor(
    private actions$: Actions,
    private shopContractService: ShopContractService,
    private snackBarService: SnackBarService,
    private shopStoreService: ShopStoreService
  ) {}

}
