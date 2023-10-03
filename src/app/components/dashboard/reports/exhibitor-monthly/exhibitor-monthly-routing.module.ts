import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExhibitorMonthlyComponent } from './exhibitor-monthly.component';

const routes: Routes = [
  {
    path: '',
    component: ExhibitorMonthlyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExhibitorMonthlyRoutingModule { }
