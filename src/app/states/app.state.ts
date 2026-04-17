import { IAuthState } from './auth/auth.reducer';
import { IRegisterState } from './register/register.reducer';

export interface AppState {
  auth: IAuthState;
  register: IRegisterState
}