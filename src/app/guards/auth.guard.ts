import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectLoggedIn } from '../states/app.selectiors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectLoggedIn).pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      }

      router.navigate(['login']);
      return false;
    }),
  );
};
