import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppModel } from "../../model/app.model";

export const selectAppState = createFeatureSelector<AppModel>('APP_STORE');
export const selectApp = createSelector(selectAppState, (state) => state);

export const selectAppProp = <K extends keyof AppModel>(prop: K) =>
    createSelector(selectAppState, (state) => state[prop]);