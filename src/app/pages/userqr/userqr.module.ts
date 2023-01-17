import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserqrPageRoutingModule } from './userqr-routing.module';

import { UserqrPage } from './userqr.page';

import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    UserqrPageRoutingModule
  ],
  declarations: [UserqrPage]
})
export class UserqrPageModule {}
