import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {catchError, map, of} from "rxjs";
import { ShopStoreService } from 'src/app/features/shop/store/shop-store.service';

export const isAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  return inject(ShopStoreService).selectAccount$()
    .pipe(
      map(account => {
        if (account) {
          return true;
        } else {
          router.navigate([''], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      }),
      catchError(() => {
        router.navigate([''], {
          queryParams: { returnUrl: state.url },
        });
        return of(false);
      })
    )
};
