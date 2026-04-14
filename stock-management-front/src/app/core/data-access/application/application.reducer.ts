import { createReducer, on } from "@ngrx/store";
import { AppModel } from "../../model/app.model";
import { ApplicationActions } from "./application.action";

export const initialApp: AppModel = {
    loading: false
}
export const appReducer = createReducer(initialApp,
    on(ApplicationActions.loading, (state, { loading }) => ({ ...state, loading })),
)