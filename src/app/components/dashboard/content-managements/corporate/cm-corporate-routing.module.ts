import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CMCorporateComponent } from './cm-corporate.component';

const routes: Routes = [
  {
    path: '',
    component: CMCorporateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMCorporateRoutingModule { }
