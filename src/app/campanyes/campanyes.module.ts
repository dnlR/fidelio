import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampanyesPageRoutingModule } from './campanyes-routing.module';

import { CampanyesPage } from './campanyes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampanyesPageRoutingModule
  ],
  declarations: [CampanyesPage]
})
export class CampanyesPageModule {}
