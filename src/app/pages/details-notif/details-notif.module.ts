import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsNotifPageRoutingModule } from './details-notif-routing.module';

import { DetailsNotifPage } from './details-notif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsNotifPageRoutingModule
  ],
  declarations: [DetailsNotifPage]
})
export class DetailsNotifPageModule {}
