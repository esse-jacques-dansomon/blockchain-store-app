import { Route } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {ShopFormComponent} from "./features/shop/shop-from/shop-form.component";
import {hasShopGuard} from "./core/guards/has-shop.guard";
import {isAuthGuard} from "./core/guards/is-auth.guard";
import {ProductListComponent} from "./features/shop/products/product-list/product-list.component";
import {CategoryListComponent} from "./features/shop/category/category-list/category-list.component";

export const appRoutes: Route[] = [
    {'path': '', redirectTo: 'home', pathMatch: 'full'},
    {'path': 'home', loadComponent: () => HomeComponent},
    {
      'path': 'create-store',
      canActivate: [isAuthGuard],
      loadComponent: () => ShopFormComponent
    },
    {
        path: 'store',
        canActivate: [hasShopGuard],
        children: [
          {'path': 'category', loadComponent: () => CategoryListComponent},
          {'path': 'product', loadComponent: () => ProductListComponent},
        ]
    }
];
