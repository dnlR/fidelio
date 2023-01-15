import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReaderQrPageRoutingModule } from './reader-qr-routing.module';

import { ReaderQrPage } from './reader-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReaderQrPageRoutingModule
  ],
  declarations: [ReaderQrPage]
})
export class ReaderQrPageModule {}
