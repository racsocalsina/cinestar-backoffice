import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { SharedModule } from '@components/shared/shared.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [NotificationsComponent, FormComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class NotificationsModule { }
