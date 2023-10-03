import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CMTermsComponent } from './cm-terms.component';

const routes: Routes = [
  {
    path: '',
    component: CMTermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMTermsRoutingModule { }
