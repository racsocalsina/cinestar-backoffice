import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalErrorsComponent } from './internal-errors.component';

const routes: Routes = [
  {
    path: '',
    component: InternalErrorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalErrorsRoutingModule { }
