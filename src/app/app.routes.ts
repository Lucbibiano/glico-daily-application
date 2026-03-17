import { Routes } from '@angular/router';
import { LayoutComponent } from './main-layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AiTipsComponent } from './ai-tips/ai-tips.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          titleKey: 'DASHBOARD',
        },
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: {
          titleKey: 'HISTORY',
        },
      },
      {
        path: 'ai-tips',
        component: AiTipsComponent,
        data: {
          titleKey: 'IA_TIPS',
        },
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
        data: {
          titleKey: 'MY_ACCOUNT',
        },
      },
    ],
  },
];
