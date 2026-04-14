import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthenticationActions } from "./auth.action";
import {exhaustMap, map, mergeMap, tap} from "rxjs";
import { UserActions } from "../user/user.actions";
import { Router } from "@angular/router";
import { AuthFacade } from "../../facade/auth.facade";
import { ResponseLogin } from "../../model/auth.model";
import { User } from "../../model/users.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationEffect {
    private actions$: Actions = inject(Actions);
    private authFacade = inject(AuthFacade);
    private router: Router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthenticationActions.requestLogin),
            exhaustMap(({ request }) =>
                this.authFacade.login(request).pipe(
                    map((res: ResponseLogin) =>
                        AuthenticationActions.successLogin({ response: res })
                    ),
                )
            )
        )
    );

    onLoginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthenticationActions.successLogin),
        map(({ response }) => {
            const user: User = this.authFacade.decodeAndStoreToken(response.accessToken);
            return UserActions.setUser({ user })
        })
    ))


    redirectAfterLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthenticationActions.successLogin),
                tap(() => {
                    this.router.navigate(['/dashboard']);
                })
            ),
        { dispatch: false }
    );

    logOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthenticationActions.logOut),
            tap(() => this.authFacade.signOut()),
            mergeMap(() => [
                UserActions.clearUser(),
                AuthenticationActions.successLogout()
            ])
        )
    );

}
