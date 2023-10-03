import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemasComponent } from '@components/dashboard/cinemas/cinemas.component';
import { BillboardComponent } from './billboard/billboard.component';

const routes: Routes = [
  {
    path: '',
    component: CinemasComponent
  },
  {
    path: ':id/billboard',
    component: BillboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemasRoutingModule { }
