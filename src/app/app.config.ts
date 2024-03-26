import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser'
import {appReducer, metaReducersProvider} from "./store/app.reducer";
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import {createFeatureReducerFactory} from "@ngrx/store/src/utils";

export const appConfig: ApplicationConfig = {
  providers: [
    metaReducersProvider,
    provideRouter(appRoutes),
    provideClientHydration(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore(appReducer, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      },
    }),
    provideEffects()
],

};
