import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordComponent } from './recover-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from '@components/shared/control-messages/control-messages.module';


@NgModule({
  declarations: [RecoverPasswordComponent],
    imports: [
        CommonModule,
        RecoverPasswordRoutingModule,
        ControlMessagesModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class RecoverPasswordModule { }
