import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Auth] Register',
  props<{ name: string; email: string; password: string }>(),
);

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>(),
);

export const codeVerification = createAction(
  '[Auth] Code Verification',
  props<{ email: string; code: string }>(),
);

export const codeVerificationFailure = createAction(
  '[Auth] Code Verification Failure',
  props<{ error: any }>(),
);

export const codeVerificationSuccess = createAction(
  '[Auth] Code Verification Success',
);
