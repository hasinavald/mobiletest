import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalementsPage } from './signalements.page';

const routes: Routes = [
  {
    path: '',
    component: SignalementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalementsPageRoutingModule {}
