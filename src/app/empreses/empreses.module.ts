import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresesPageRoutingModule } from './empreses-routing.module';

import { EmpresesPage } from './empreses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmpresesPageRoutingModule
  ],
  declarations: [EmpresesPage]
})
export class EmpresesPageModule {}
