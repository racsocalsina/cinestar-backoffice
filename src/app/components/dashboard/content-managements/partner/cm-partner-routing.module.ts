import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CMPartnerComponent } from './cm-partner.component';

const routes: Routes = [
  {
    path: '',
    component: CMPartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMPartnerRoutingModule { }
