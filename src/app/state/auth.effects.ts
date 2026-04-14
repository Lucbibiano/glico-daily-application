import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../services/authentication.service';
import * as AuthActions from './auth.actions';
import { catchError, delay, from, map, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authenticationService = inject(AuthenticationService);
  private notificationService = inject(NotificationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        from(this.authenticationService.login(email, password)).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => {
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
        tap(({ user }) => {
          console.log('Logou com sucesso');
          console.log('Usuario logado:', user);
        }),
      ),
    { dispatch: false },
  );
}
