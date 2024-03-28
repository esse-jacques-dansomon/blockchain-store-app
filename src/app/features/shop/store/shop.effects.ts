import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, switchMap} from "rxjs";
import {ShopActionTypes} from "./shop.action";
import {Shop} from "../../../data/models/shop";
import {Category} from "../../../data/models/category";
import {Product} from "../../../data/models/product";
import {ShopContractService} from "../../../data/services/shop-contract.service";

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
  ) {}

}
