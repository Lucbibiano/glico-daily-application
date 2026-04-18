import { HttpInterceptorFn } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { selectAuth } from '../states/app.selectiors';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const store = inject(Store);

  return store.select(selectAuth).pipe(
    switchMap((auth) => {

      if (!auth.token) {
        return next(req);
      }

      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return next(cloned);
    }),
  );
};
