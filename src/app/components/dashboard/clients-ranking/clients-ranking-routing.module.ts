import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsRankingComponent } from './clients-ranking.component';

const routes: Routes = [{ path: '', component: ClientsRankingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRankingRoutingModule { }
