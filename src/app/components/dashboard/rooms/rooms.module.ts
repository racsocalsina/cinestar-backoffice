import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { SharedModule } from '@components/shared/shared.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [RoomsComponent, FormComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class RoomsModule { }
