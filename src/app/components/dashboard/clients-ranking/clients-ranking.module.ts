import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRankingRoutingModule } from './clients-ranking-routing.module';
import { ClientsRankingComponent } from './clients-ranking.component';
import {SharedModule} from "@components/shared/shared.module";


@NgModule({
  declarations: [ClientsRankingComponent],
  imports: [
    CommonModule,
    ClientsRankingRoutingModule,
    SharedModule
  ]
})
export class ClientsRankingModule { }
