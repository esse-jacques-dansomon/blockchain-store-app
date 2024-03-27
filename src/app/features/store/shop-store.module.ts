import {InjectionToken, NgModule} from "@angular/core";
import {StoreConfig, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {shopFeatureKey, shopInitialState, shopReducer, ShopState} from "./shop.reducer";
import {featureStoreConfigFactory, StoreStateService} from "../../store";
import {ShopContractService} from "../../data/services/shop-contract.service";
import {ShopEffects} from "./shop.effects";

const featureKey =shopFeatureKey;

export const shopFeatureStoreKeyToken = new InjectionToken(`FeatureStoreKeyInjectionToken:${featureKey}`);
export const shopFeatureStoreInitialStateToken = new InjectionToken<ShopState>(
  `FeatureStoreInitialStateInjectionToken:${featureKey}`
);
export const shopStoreFeatureConfigToken = new InjectionToken<StoreConfig<ShopState>>(
  `FeatureStoreConfigInjectionToken:${featureKey}`
);

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, shopReducer as any, shopStoreFeatureConfigToken),
    EffectsModule.forFeature([ShopEffects]),
  ],
  providers: [
    {
      provide: shopFeatureStoreKeyToken,
      useValue: featureKey,
    },
    {
      provide: shopFeatureStoreInitialStateToken,
      useValue: shopInitialState,
    },
    {
      provide: shopStoreFeatureConfigToken,
      deps: [shopFeatureStoreKeyToken, shopFeatureStoreInitialStateToken, StoreStateService],
      useFactory: featureStoreConfigFactory,
    },
    ShopContractService,
  ],
})
export class shopStoreModule {}
