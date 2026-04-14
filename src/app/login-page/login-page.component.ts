import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { AuthenticationService } from '../services/authentication.service';
import { Store, USER_RUNTIME_CHECKS } from '@ngrx/store';
import * as AuthActions from './../state/auth.actions';
import { AppState } from '../state/app.state';
import { selectLoading } from '../state/app.selectiors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
  protected isConfirmCodeStep = true;
  protected activeTab: 'login' | 'setup' = 'login';
  protected loading$!: Observable<boolean>;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly authenticationService: AuthenticationService,
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
      email: new FormControl(null, [Validators.required, Validators.email]),
      code: new FormControl(null, [
        Validators.required,
        Validators.pattern('^\d+$'),
      ]),
    });
  }

  public ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
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

    this.authenticationService
      .register(
        this.setupForm.get('email')?.value,
        this.setupForm.get('password')?.value,
        this.setupForm.get('userName')?.value,
      )
      .then(() => {
        this.notificationService.showNotificationBar(
          '✅ Código enviado para o email informado. Verifique sua caixa de entrada e confirme seu cadastro!',
          'Fechar',
          4000,
        );
        this.setupForm.reset();
        this.setupForm.clearValidators();
        this.isConfirmCodeStep = true;
      })
      .catch(() => {
        this.notificationService.showNotificationBar(
          '❌ Ocorreu um erro ao realizar o cadastro. Tente novamente!',
          'Fechar',
          4000,
        );
      });
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

    this.authenticationService
      .confirm(
        this.confirmCodeForm.get('email')?.value,
        this.confirmCodeForm.get('code')?.value,
      )
      .then(() => {
        this.confirmCodeForm.reset();
        this.confirmCodeForm.clearValidators();
        this.isConfirmCodeStep = false;
        this.activeTab = 'login';
        this.notificationService.showNotificationBar(
          '✅ Cadastro confirmado com sucesso! Agora você pode fazer login.',
          'Fechar',
          4000,
        );
      })
      .catch(() => {
        this.notificationService.showNotificationBar(
          '❌ Ocorreu um erro ao confirmar o cadastro. Tente novamente!',
          'Fechar',
          4000,
        );
      });
  }
}
