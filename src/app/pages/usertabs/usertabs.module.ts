import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsertabsPageRoutingModule } from './usertabs-routing.module';

import { UsertabsPage } from './usertabs.page';

import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsertabsPageRoutingModule,
    MaterialModule
  ],
  declarations: [UsertabsPage]
})
export class UsertabsPageModule {}
