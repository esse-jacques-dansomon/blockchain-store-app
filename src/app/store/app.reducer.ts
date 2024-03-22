import {ActionReducerMap} from "@ngrx/store";
import {getMetaReducersProvider} from "./store.providers";


export interface AppState {

}

export const appReducer: ActionReducerMap<AppState> = {} as any;
export const metaReducersProvider = getMetaReducersProvider();
