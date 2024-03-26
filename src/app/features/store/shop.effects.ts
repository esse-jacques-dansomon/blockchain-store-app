import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ShopContractService} from "../../services/shop-contract.service";
import {exhaustMap, map, switchMap} from "rxjs";
import {ShopActionTypes} from "./shop.action";
import {Shop} from "../../data/shop";
import {Category} from "../../data/category";
import {Product} from "../../data/product";

@Injectable()
export class ShopEffects {

     loadShop$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShopActionTypes.SelectShop),
        exhaustMap((action) =>
          this.shopContractService.getShop().then(
            (shop: Shop) => {
              console.log('Shop',shop.name)

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

  constructor(
    private actions$: Actions,
    private shopContractService: ShopContractService,
  ) {}

}
