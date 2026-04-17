import { createReducer, on } from '@ngrx/store';
import * as RegisterActions from './register.actions';

export interface IRegisterState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  error: any;
}

export const initialState: IRegisterState = {
  name: '',
  email: '',
  password: '',
  loading: false,
  error: null,
};

export const registerReducer = createReducer(
  initialState,
  on(RegisterActions.register, (state) => ({
    ...state,
    loading: true,
  })),
  on(RegisterActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(RegisterActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(RegisterActions.codeVerification, (state) => ({
    ...state,
    loading: true,
  })),
  on(RegisterActions.codeVerificationFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(RegisterActions.codeVerificationSuccess, (state) => ({
    ...state,
    loading: false,
  })),
);
