import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalFormPage } from './signal-form.page';

const routes: Routes = [
  {
    path: '',
    component: SignalFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalFormPageRoutingModule {}
