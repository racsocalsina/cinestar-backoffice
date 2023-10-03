import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAdminRoutingModule } from './users-admin-routing.module';
import { UsersAdminComponent } from './users-admin.component';
import { SharedModule } from '@components/shared/shared.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormComponent } from './form/form.component';
import { ControlMessagesModule } from '@components/shared/control-messages/control-messages.module';

@NgModule({
  declarations: [UsersAdminComponent, FormComponent],
  imports: [
    CommonModule,
    UsersAdminRoutingModule,
    SharedModule,
    DirectivesModule,
    ControlMessagesModule
  ]
})
export class UsersAdminModule { }
