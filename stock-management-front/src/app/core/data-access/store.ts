import { ActionReducerMap } from '@ngrx/store';

import { AuthModel } from "./authentication/auth.state";
import { User } from '../model/users.model';
import { userReducer } from './user/user.reducer';
import { authReducer } from './authentication/auth.reducer';
import { AppModel } from '../model/app.model';
import { appReducer } from './application/application.reducer';

export interface State {
    APP_STORE: AppModel,
    USER_STORE: User,
    AUTH_STORE: AuthModel
}

export const reducers: ActionReducerMap<State> = {
    USER_STORE: userReducer,
    AUTH_STORE: authReducer,
    APP_STORE: appReducer

};
