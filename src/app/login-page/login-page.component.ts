import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../states/auth/auth.actions';
import * as RegisterActions from '../states/register/register.actions';
import { AppState } from '../states/app.state';
import {
  selectLoadingAuth,
  selectLoadingRegister,
} from '../states/app.selectiors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-login-page',
  imports: [TranslateModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  protected loginForm: FormGroup;
  protected setupForm: FormGroup;
  protected confirmCodeForm: FormGroup;
  protected showPassword = false;
  protected showNewPassword = false;
  protected showConfirmPassword = false;
  protected isConfirmCodeStep = false;
  protected activeTab: 'login' | 'setup' = 'login';
  protected loading$!: Observable<boolean>;
  protected loadingRegister$!: Observable<boolean>;
  private actions$ = inject(Actions);

  constructor(
    private readonly notificationService: NotificationService,
    private store: Store<AppState>,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.setupForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
    this.confirmCodeForm = new FormGroup({
      email: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      code: new FormControl(null, [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this.loading$ = this.store.select(selectLoadingAuth);
    this.loadingRegister$ = this.store.select(selectLoadingRegister);

    this.actionsSub();
  }

  protected login(): void {
    if (this.loginForm.invalid) {
      this.notificationService.showNotificationBar(
        '⚠️ Os campos de login estão inválidos. Ajuste-os e tente novamente!',
        'Fechar',
        4000,
      );
      return;
    }
    this.store.dispatch(
      AuthActions.login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }),
    );
  }

  protected setupUser(): void {
    if (this.setupForm.invalid) {
      this.notificationService.showNotificationBar(
        '⚠️ Os campos do cadatro estão inválidos. Ajuste-os e tente novamente!',
        'Fechar',
        4000,
      );
      return;
    }
    this.store.dispatch(
      RegisterActions.register({
        name: this.setupForm.get('userName')?.value,
        password: this.setupForm.get('password')?.value,
        email: this.setupForm.get('email')?.value,
      }),
    );
  }

  protected confirmCode(): void {
    if (this.confirmCodeForm.invalid) {
      this.notificationService.showNotificationBar(
        '⚠️ O campo de código está inválido. Ajuste-o e tente novamente!',
        'Fechar',
        4000,
      );
      return;
    }

    this.store.dispatch(
      RegisterActions.codeVerification({
        email: this.confirmCodeForm.get('email')?.value,
        code: this.confirmCodeForm.get('code')?.value,
      }),
    );
  }

  private actionsSub(): void {
    this.actions$.pipe(ofType(AuthActions.loginSuccess)).subscribe(() => {
      this.loginForm.reset();
      this.loginForm.clearValidators();
    });
    this.actions$
      .pipe(ofType(RegisterActions.registerSuccess))
      .subscribe(() => {
        this.confirmCodeForm
          .get('email')
          ?.setValue(this.setupForm.get('email')?.value);
        this.setupForm.reset();
        this.setupForm.clearValidators();
        this.isConfirmCodeStep = true;
      });
    this.actions$
      .pipe(ofType(RegisterActions.codeVerificationSuccess))
      .subscribe(() => {
        this.confirmCodeForm.reset();
        this.confirmCodeForm.clearValidators();
        this.isConfirmCodeStep = false;
        this.activeTab = 'login';
      });
  }
}
