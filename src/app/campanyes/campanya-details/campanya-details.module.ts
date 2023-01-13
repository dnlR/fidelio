import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';  //https://masteringionic.com/blog/implementing-a-colour-picker-in-ionic-angular-applications

import { IonicModule } from '@ionic/angular';

import { CampanyaDetailsPageRoutingModule } from './campanya-details-routing.module';

import { CampanyaDetailsPage } from './campanya-details.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ColorPickerModule,
    CampanyaDetailsPageRoutingModule,
  ],
  declarations: [CampanyaDetailsPage]
})
export class CampanyaDetailsPageModule {}
