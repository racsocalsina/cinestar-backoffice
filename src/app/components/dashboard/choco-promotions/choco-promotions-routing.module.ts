import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChocoPromotionsComponent } from './choco-promotions.component';

const routes: Routes = [
  {
    path: '',
    component: ChocoPromotionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChocoPromotionsRoutingModule { }
