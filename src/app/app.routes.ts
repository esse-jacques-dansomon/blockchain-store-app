import { Route } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {UploadImageComponent} from "./features/shop/upload-image/upload-image.component";
import {ShopFormComponent} from "./features/shop/shop-from/shop-form.component";
import {hasShopGuard} from "./core/guards/has-shop.guard";
import {isAuthGuard} from "./core/guards/is-auth.guard";
import {CategoryComponent} from "./features/shop/category/category.component";

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
          {'path': 'add-category', loadComponent: () => CategoryComponent},
          {'path': 'add-product', loadComponent: () => UploadImageComponent},
        ]
    }
];
