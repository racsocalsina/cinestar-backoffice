import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreComponent } from './genre.component';
import { SharedModule } from '@components/shared/shared.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormComponent } from './form/form.component';
import { ControlMessagesModule } from '@components/shared/control-messages/control-messages.module';


@NgModule({
  declarations: [GenreComponent, FormComponent],
  imports: [
    CommonModule,
    GenreRoutingModule,
    SharedModule,
    DirectivesModule,
    ControlMessagesModule
  ]
})
export class GenreModule { }
