import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthInactiveGuard } from './guards/auth-inactive.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@components/dashboard/dashboard.module').then( m => m.DashboardModule ),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('@components/login/login.module').then( m => m.LoginModule ),
    canActivateChild: [AuthInactiveGuard]
  },
  {
    path: 'recover-password',
    loadChildren: () => import('@components/recover-password/recover-password.module').then( m => m.RecoverPasswordModule ),
    canActivateChild: [AuthInactiveGuard]
  },
  {
    path: '**',
    redirectTo: '/cinemas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { useHash: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
