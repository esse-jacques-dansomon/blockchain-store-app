import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ShopStoreService} from "../../features/store/shop-store.service";
import {catchError, map, of} from "rxjs";
export const hasShopGuard: CanActivateFn = (route, state, ) => {
  const router = inject(Router);
  return inject(ShopStoreService).selectSelectedShop$()
    .pipe(
      map(shop => {
        if (shop) {
          return true;
        } else {
          router.navigate(['create-store'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['create-store'], {
          queryParams: { returnUrl: state.url },
        });
        return of(false);
      })
    )
};
