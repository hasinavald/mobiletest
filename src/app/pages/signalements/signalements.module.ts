import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalementsPageRoutingModule } from './signalements-routing.module';

import { SignalementsPage } from './signalements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalementsPageRoutingModule
  ],
  declarations: [SignalementsPage]
})
export class SignalementsPageModule {}
