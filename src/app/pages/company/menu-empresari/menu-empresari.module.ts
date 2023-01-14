import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEmpresariPageRoutingModule } from './menu-empresari-routing.module';

import { MenuEmpresariPage } from './menu-empresari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEmpresariPageRoutingModule
  ],
  declarations: [MenuEmpresariPage]
})
export class MenuEmpresariPageModule {}
