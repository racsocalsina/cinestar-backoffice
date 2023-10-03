import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChocoReportsComponent } from './choco-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ChocoReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChocoReportsRoutingModule { }
