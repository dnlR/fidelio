import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserqrPageRoutingModule } from './userqr-routing.module';

import { UserqrPage } from './userqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserqrPageRoutingModule
  ],
  declarations: [UserqrPage]
})
export class UserqrPageModule {}
