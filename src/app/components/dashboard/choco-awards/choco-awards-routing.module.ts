import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChocoAwardsComponent } from './choco-awards.component';

const routes: Routes = [
  {
    path: '',
    component: ChocoAwardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChocoAwardsRoutingModule { }
