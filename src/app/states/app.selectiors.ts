import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAuth = (state: AppState) => state.auth;

export const selectLoadingAuth = createSelector(selectAuth, (auth) => auth.loading);

export const selectLoggedIn = createSelector(selectAuth, (auth) => auth.isLoggedIn);

export const selectRegister = (state: AppState) => state.register;

export const selectLoadingRegister = createSelector(selectRegister, (register) => register.loading);