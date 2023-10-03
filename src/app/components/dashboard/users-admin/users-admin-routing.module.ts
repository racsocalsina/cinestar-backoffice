import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from '@components/dashboard/users-admin/users-admin.component';

const routes: Routes = [
  {
    path: '',
    component: UsersAdminComponent
  }
];

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
} )
export class UsersAdminRoutingModule {}
