import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercardsPageRoutingModule } from './usercards-routing.module';

import { UsercardsPage } from './usercards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercardsPageRoutingModule
  ],
  declarations: [UsercardsPage]
})
export class UsercardsPageModule {}
