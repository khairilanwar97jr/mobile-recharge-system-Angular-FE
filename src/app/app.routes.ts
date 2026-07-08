import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { RechargeComponent } from './pages/recharge/recharge';


export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

    {
    path: 'dashboard',
    component: Dashboard
  },

  {
 path:'recharge',
 component:RechargeComponent
}

];