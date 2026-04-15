import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../services/authentication.service';
import * as AuthActions from './auth.actions';
import { catchError, delay, from, map, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authenticationService = inject(AuthenticationService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        from(this.authenticationService.login(email, password)).pipe(
          map((loginResponse) => AuthActions.loginSuccess({ loginResponse })),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((error) => {
          console.log('Erro ao realizar login:', error);
          this.notificationService.showNotificationBar(
            '❌ Ocorreu um erro ao realizar o login. Tente novamente!',
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
        tap(() => {
          this.router.navigate(['/dashboard']);
        }),
      ),
    { dispatch: false },
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      map(({ loginResponse }) => AuthActions.loginSuccess({ loginResponse })),
    ),
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() =>
        from(this.authenticationService.logout()).pipe(
          map(() => AuthActions.logOutSuccess()),
          catchError(() => of(AuthActions.logOutFailure())),
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
        tap(() => {
          this.notificationService.showNotificationBar(
            '❌ Ocorreu um erro ao realizar o logout. Tente novamente!',
            'Fechar',
            4000,
          );
        }),
      ),
    { dispatch: false },
  );
}
