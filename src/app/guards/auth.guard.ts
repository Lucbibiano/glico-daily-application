import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { selectAuth } from '../states/app.selectiors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuth).pipe(
    filter((auth) => auth.isInitialized),
    take(1),
    map((auth) => {
      if (auth.isLoggedIn) {
        return true;
      }

      return router.createUrlTree(['/login']);
    }),
  );
};
