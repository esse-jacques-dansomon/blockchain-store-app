import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class hasShopInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("access_token");
    const isApiUrl = req.url.startsWith(environment.ipfs);
    if (idToken ) {
      const cloned = req.clone({
        headers: req.headers
          .set("Authorization", "Bearer " + idToken)
      });
      return next.handle(cloned);
    }
    else {
      const cloned2 = req.clone({
        headers: req.headers
      });
      return next.handle(cloned2);
    }
  }
}
