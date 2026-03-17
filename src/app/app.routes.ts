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
          title: 'Dashboard',
        },
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: {
          title: 'Histórico',
        },
      },
      {
        path: 'ai-tips',
        component: AiTipsComponent,
        data: {
          title: 'Dicas da IA',
        },
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
        data: {
          title: 'Minha Conta',
        },
      },
    ],
  },
];
