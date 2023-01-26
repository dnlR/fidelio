import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEmpresariPageRoutingModule } from './menu-empresari-routing.module';

import { MenuEmpresariPage } from './menu-empresari.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEmpresariPageRoutingModule,
    ToolbarModule
  ],
  declarations: [MenuEmpresariPage]
})
export class MenuEmpresariPageModule {}
