import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailSignalPage } from './detail-signal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSignalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailSignalPageRoutingModule {}
