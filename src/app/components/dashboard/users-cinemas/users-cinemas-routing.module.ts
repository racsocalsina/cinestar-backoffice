import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersCinemasComponent } from '@components/dashboard/users-cinemas/users-cinemas.component';

const routes: Routes = [
  {
    path: '',
    component: UsersCinemasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersCinemasRoutingModule { }
