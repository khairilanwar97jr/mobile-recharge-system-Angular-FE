import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { RechargeComponent } from './pages/recharge/recharge';
import { History } from './pages/history/history';
import { Rewards } from './pages/rewards/rewards';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'recharge',
    component: RechargeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'history',
    component: History,
    canActivate: [authGuard]
  },
  {
    path: 'rewards',
    component: Rewards,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];