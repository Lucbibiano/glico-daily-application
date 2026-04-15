import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  loginResponse: any;
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  loginResponse: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    loading: false,
    isLoggedIn: true,
    loginResponse,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.logOutSuccess, (state) => ({
    ...state,
    isLoggedIn: false,
    loading: false,
    loginResponse: null
  })),
  on(AuthActions.logOutFailure, (state) => ({
    ...state,
    loading: false,
  })),
);
