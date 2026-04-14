import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { AuthFacade } from '../../facade/auth.facade';
import { NotificationService } from '../../services/notification.service';
import { AuthenticationActions } from '../authentication/auth.action';
import { ApplicationActions } from './application.action';

@Injectable({ providedIn: 'root' })
export class ApplicationEffect {
  private _actions: Actions = inject(Actions);
  private _notifiacationService: NotificationService =
    inject(NotificationService);
  private _auhFacade: AuthFacade = inject(AuthFacade);
  private router: Router = inject(Router);

  errorHandler$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ApplicationActions.handleError),
        tap(({ message }) => this._notifiacationService.handleError(message))
      ),
    { dispatch: false }
  );

  successHandlerWithRouting$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ApplicationActions.handleSuccessWithRouting),
        map(({ message, navigateTo }) =>
          this._notifiacationService.handleSuccessWithRouting(
            message,
            navigateTo
          )
        )
      ),
    { dispatch: false }
  );

  successHandler$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ApplicationActions.handleSuccess),
        tap(({ message }) => console.log('Success action received:', message)),
        map(({ message }) => this._notifiacationService.handleSuccess(message))
      ),
    { dispatch: false }
  );

  initApplication$ = createEffect(() =>
    this._actions.pipe(
      ofType(ApplicationActions.init),
      map(() => this._auhFacade.init()),
      map(({ token, valid }) =>
        valid
          ? AuthenticationActions.successLogin({
              response: { accessToken: token! },
            })
          : ApplicationActions.initUnauthenticated()
      )
    )
  );

  initUnauthenticatedNavigate$ = createEffect(
    () =>
      this._actions.pipe(
        ofType(ApplicationActions.initUnauthenticated),
        tap(() => this.router.navigateByUrl('/signin'))
      ),
    { dispatch: false }
  );
}
