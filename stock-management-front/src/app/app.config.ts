import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ApplicationActions } from './core/data-access/application/application.action';
import { ApplicationEffect } from './core/data-access/application/application.effect';
import { AuthenticationEffect } from './core/data-access/authentication/auth.effect';
import { reducers, State } from './core/data-access/store';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(MatSnackBarModule),
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(
      withInterceptors([authorizationInterceptor, errorInterceptor])
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    provideEffects([ApplicationEffect, AuthenticationEffect]),
    provideAppInitializer(initializeApp),
  ],
};
function initializeApp() {
  const store: Store<State> = inject(Store<State>);
  store.dispatch(ApplicationActions.init());
}
