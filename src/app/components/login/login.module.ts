import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ControlMessagesModule } from '@components/shared/control-messages/control-messages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ControlMessagesModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LoginModule { }
