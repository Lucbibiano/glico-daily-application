import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../services/authentication.service';
import * as RegisterActions from './register.actions';
import * as AuthActions from './../auth/auth.actions';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class RegisterEffects {
  private actions$ = inject(Actions);
  private authenticationService = inject(AuthenticationService);
  private notificationService = inject(NotificationService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      switchMap(({ email, password, name }) =>
        from(this.authenticationService.register(email, password, name)).pipe(
          map(() => {
            return RegisterActions.registerSuccess();
          }),
          catchError((error) => of(RegisterActions.registerFailure({ error }))),
        ),
      ),
    ),
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.registerFailure),
        tap((error) => {
          this.notificationService.showNotificationBar(
            '❌ Ocorreu um erro ao realizar o cadastro. Tente novamente!',
            'Fechar',
            4000,
          );
        }),
      ),
    { dispatch: false },
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.registerSuccess),
        tap(() => {
          this.notificationService.showNotificationBar(
            '✅ Código enviado para o email informado. Verifique sua caixa de entrada e confirme seu cadastro!',
            'Fechar',
            4000,
          );
        }),
      ),
    { dispatch: false },
  );

  codeVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.codeVerification),
      switchMap(({ email, code }) =>
        from(this.authenticationService.confirm(email, code)).pipe(
          map(() => AuthActions.loginSuccess()),
          catchError((error) =>
            of(RegisterActions.codeVerificationFailure(error)),
          ),
        ),
      ),
    ),
  );

  codeVerificationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.codeVerificationFailure),
        tap(() => {
          this.notificationService.showNotificationBar(
            '❌ Ocorreu um erro ao verificar o código inserido. Tente novamente!',
            'Fechar',
            4000,
          );
        }),
      ),
    { dispatch: false },
  );

  codeVerificationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.codeVerificationSuccess),
      tap(() => {
        this.notificationService.showNotificationBar(
          '✅ Cadastro concluído com sucesso!',
          'Fechar',
          4000,
        );
      }),
      map(() => AuthActions.loginSuccess()),
    ),
  );
}
