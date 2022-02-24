import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailSignalPageRoutingModule } from './detail-signal-routing.module';

import { DetailSignalPage } from './detail-signal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailSignalPageRoutingModule
  ],
  declarations: [DetailSignalPage]
})
export class DetailSignalPageModule {}
