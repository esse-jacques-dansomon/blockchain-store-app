import {ActionReducerMap} from "@ngrx/store";
import {getMetaReducersProvider} from "./store.providers";
import {ShopState} from "../features/store/shop.reducer";


export interface AppState {
  shop: ShopState
}

export const appReducer: ActionReducerMap<AppState> = {} as any;
export const metaReducersProvider = getMetaReducersProvider();
