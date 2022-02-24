import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalFormPageRoutingModule } from './signal-form-routing.module';

import { SignalFormPage } from './signal-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalFormPageRoutingModule
  ],
  declarations: [SignalFormPage]
})
export class SignalFormPageModule {}
