import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { CampanyesPageRoutingModule } from './campanyes-routing.module';

import { CampanyesPage } from './campanyes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    CampanyesPageRoutingModule
  ],
  declarations: [CampanyesPage]
})
export class CampanyesPageModule {}
