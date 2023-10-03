import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErpSystemVarsComponent } from './erp-system-vars.component';

const routes: Routes = [
  {
    path: '',
    component: ErpSystemVarsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpSystemVarsRoutingModule { }
