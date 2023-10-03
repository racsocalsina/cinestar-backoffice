import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemConfigurationComponent } from './system-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: SystemConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigurationRoutingModule { }
