import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { SharedModule } from '@components/shared/shared.module';
import { FormComponent } from './form/form.component';
import { DirectivesModule } from '../../../directives/directives.module';
import { CinemasAvailableComponent } from './cinemas-available/cinemas-available.component';


@NgModule({
  declarations: [FilmsComponent, FormComponent, CinemasAvailableComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class FilmsModule { }
