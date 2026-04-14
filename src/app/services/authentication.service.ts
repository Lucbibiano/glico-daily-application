import { Injectable } from '@angular/core';
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  getCurrentUser,
  SignInOutput,
  SignUpOutput,
  ConfirmSignUpOutput,
  AuthUser,
} from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  public async login(
    email: string,
    password: string
  ): Promise<SignInOutput> {
    return await signIn({
      username: email,
      password: password,
    });
  }

  public async register(
    email: string,
    password: string,
    name: string,
  ): Promise<SignUpOutput> {
    return await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email,
          name: name,
        },
      },
    });
  }

  public async confirm(
    email: string,
    code: string,
  ): Promise<ConfirmSignUpOutput> {
    return await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  }

  public async logout(): Promise<void> {
    return await signOut();
  }

  public async getUser(): Promise<AuthUser> {
    return await getCurrentUser();
  }
}
