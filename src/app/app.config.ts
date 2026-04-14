import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatSnackBarModule),
    provideTranslateService({
        loader: provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json'
        })
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
        },
    }),
    provideStore({
        auth: authReducer
    }),
    provideEffects([AuthEffects])
],
};
