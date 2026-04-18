import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string, initialize?: boolean}>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>(),
);

export const logOut = createAction('[Auth] Logout');

export const logOutSuccess = createAction('[Auth] Logout Success');

export const logOutFailure = createAction('[Auth] Logout Failure', props<{ redirectOnly?: boolean }>());

export const storeToken = createAction('[Auth] Store Token');

export const initializeSession = createAction('[Auth] Initialize Session');