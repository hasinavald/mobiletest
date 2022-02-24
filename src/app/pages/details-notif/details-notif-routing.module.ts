import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsNotifPage } from './details-notif.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsNotifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsNotifPageRoutingModule {}
