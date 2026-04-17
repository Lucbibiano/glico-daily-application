import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction('[Auth] Login Success');

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>(),
);

export const logOut = createAction('[Auth] Logout');

export const logOutSuccess = createAction('[Auth] Logout Success');

export const logOutFailure = createAction('[Auth] Logout Failure');
