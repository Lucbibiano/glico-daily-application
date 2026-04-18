import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../services/authentication.service';
import * as AuthActions from './auth.actions';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchAuthSession } from 'aws-amplify/auth';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authenticationService = inject(AuthenticationService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        from(this.authenticationService.login(email, password)).pipe(
          map(() => AuthActions.storeToken()),
          catchError((error) => {
            return of(AuthActions.loginFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((error: any) => {
          this.notificationService.showNotificationBar(
            `❌ Ocorreu um erro ao realizar o login. Tente novamente!${error?.error ? ` Error: ${error.error}` : ''}`,
            'Fechar',
            4000,
          );
        }),
      ),
    { dispatch: false },
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((response) => {
          if (!response?.initialize) {
            this.router.navigate(['/dashboard']);
          }
        }),
      ),
    { dispatch: false },
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() =>
        from(this.authenticationService.logout()).pipe(
          map(() => AuthActions.logOutSuccess()),
          catchError(() => of(AuthActions.logOutFailure({}))),
        ),
      ),
    ),
  );

  logOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOutSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  logOutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOutFailure),
        tap(({ redirectOnly }) => {
          if (redirectOnly) {
            this.router.navigate(['login']);
          } else {
            this.notificationService.showNotificationBar(
              '❌ Ocorreu um erro ao realizar o logout. Tente novamente!',
              'Fechar',
              4000,
            );
          }
        }),
      ),
    { dispatch: false },
  );

  storeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.storeToken),
      switchMap(() => {
        return from(fetchAuthSession()).pipe(
          map((session) => {
            const token = session.tokens?.accessToken.toString() || '';
            return AuthActions.loginSuccess({ token });
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({ error }));
          }),
        );
      }),
    ),
  );

  initializeSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeSession),
      switchMap(() => {
        return from(fetchAuthSession()).pipe(
          map((session) => {
            const token = session.tokens?.accessToken.toString() || '';
            if (token) {
              return AuthActions.loginSuccess({ token, initialize: true });
            }
            return AuthActions.logOutFailure({ redirectOnly: true });
          }),
        );
      }),
    ),
  );
}
