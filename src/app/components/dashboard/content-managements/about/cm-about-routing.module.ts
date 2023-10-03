import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CMAboutComponent } from './cm-about.component';

const routes: Routes = [
  {
    path: '',
    component: CMAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMAboutRoutingModule { }
