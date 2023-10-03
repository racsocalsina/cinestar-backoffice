import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupBannerComponent } from './popup-banner.component';

const routes: Routes = [
  {
    path: '',
    component: PopupBannerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupBannerRoutingModule { }
