import { Routes } from '@angular/router';
import { LayoutComponent } from './main-layout/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        data: {
          titleKey: 'DASHBOARD',
        },
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./history/history.component').then((m) => m.HistoryComponent),
        data: {
          titleKey: 'HISTORY',
        },
      },
      {
        path: 'ai-tips',
        loadComponent: () =>
          import('./ai-tips/ai-tips.component').then((m) => m.AiTipsComponent),
        data: {
          titleKey: 'IA_TIPS',
        },
      },
      {
        path: 'my-account',
        loadComponent: () =>
          import('./my-account/my-account.component').then(
            (m) => m.MyAccountComponent,
          ),
        data: {
          titleKey: 'MY_ACCOUNT',
        },
      },
    ],
  },
];
