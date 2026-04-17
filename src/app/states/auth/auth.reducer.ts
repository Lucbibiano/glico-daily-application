import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface IAuthState {
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
}

export const initialState: IAuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    loading: false,
    isLoggedIn: true,
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
