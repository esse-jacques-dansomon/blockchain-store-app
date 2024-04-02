import {isDevMode, LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {appReducer, metaReducersProvider} from "./store/app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {PreloadAllModules, RouterModule, RouterOutlet} from "@angular/router";
import {appRoutes} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import localeFr from '@angular/common/locales/fr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {shopStoreModule} from "./features/shop/store/shop-store.module";
import {MatProgressBar} from "@angular/material/progress-bar";
import {QRCodeModule} from "angularx-qrcode";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
registerLocaleData(localeFr);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadAllModules
    }),
    CommonModule,
    RouterOutlet,
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      },
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 100, logOnly: !isDevMode()}),
    shopStoreModule,
    MatProgressBar,
    QRCodeModule,
    MatToolbar,
    MatAnchor,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton
  ],
  providers: [

    metaReducersProvider,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
