import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAuth = (state: AppState) => state.auth;

export const selectLoading = createSelector(selectAuth, (auth) => auth.loading);

export const selectLoggedIn = createSelector(selectAuth, (auth) => auth.isLoggedIn);