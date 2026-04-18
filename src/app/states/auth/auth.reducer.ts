import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface IAuthState {
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
  isInitialized: boolean;
  token: string;
}

export const initialState: IAuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  isInitialized: false,
  token: ''
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    isLoggedIn: true,
    token: token,
    isInitialized: true,

  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error: error,
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
  })),
  on(AuthActions.logOutFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
