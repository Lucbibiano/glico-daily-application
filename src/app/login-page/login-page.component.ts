import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-page',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  protected loginForm: FormGroup;
  protected setupForm: FormGroup;
  protected confirmCodeForm: FormGroup;
  protected showPassword = false;
  protected showNewPassword = false;
  protected showConfirmPassword = false;
  protected isConfirmCodeStep = true;
  protected activeTab: 'login' | 'setup' = 'login';

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authenticationService: AuthenticationService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$',
        ),
      ]),
    });
    this.setupForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$',
        ),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$',
        ),
      ]),
    });
    this.confirmCodeForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      code: new FormControl(null, [
        Validators.required,
        Validators.pattern('^\d+$'),
      ]),
    });
  }

  protected login(): void {
    if (this.loginForm.invalid) {
      this.notificationService.showNotificationBar(
        'Os campos de login estão inválidos. Ajuste-os e tente novamente!',
        'Fechar',
        4000,
      );
      return;
    }
    this.authenticationService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value,
      )
      .then(() => {
        // TODO Atualizar o NGRX
      })
      .catch(() => {
        this.notificationService.showNotificationBar(
          'Ocorreu um erro ao realizar o login. Tente novamente!',
          'Fechar',
          4000,
        );
      });
  }

  protected setupUser(): void {
    if (this.setupForm.invalid) {
      this.notificationService.showNotificationBar(
        'Os campos do cadatro estão inválidos. Ajuste-os e tente novamente!',
        'Fechar',
        4000,
      );
      return;
    }

    this.authenticationService
      .register(
        this.setupForm.get('email')?.value,
        this.setupForm.get('password')?.value,
        this.setupForm.get('name')?.value,
      )
      .then(() => {
        // TODO Atualizar o NGRX
      })
      .catch(() => {
        this.notificationService.showNotificationBar(
          'Ocorreu um erro ao realizar o cadastro. Tente novamente!',
          'Fechar',
          4000,
        );
      });
  }

  protected confirmCode(): void {
    if (this.confirmCodeForm.invalid) {
      this.notificationService.showNotificationBar(
        'O campo de código está inválido. Ajuste-o e tente novamente!',
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
        // TODO Atualizar o NGRX
      })
      .catch(() => {
        this.notificationService.showNotificationBar(
          'Ocorreu um erro ao confirmar o cadastro. Tente novamente!',
          'Fechar',
          4000,
        );
      });
  }
}
