import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportQrStatusComponent } from './qr-status.component';

const routes: Routes = [
  {
    path: '',
    component: ReportQrStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportQrStatusRoutingModule { }
