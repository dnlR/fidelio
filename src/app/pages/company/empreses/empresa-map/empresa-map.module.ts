import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmpresaMapPageRoutingModule } from './empresa-map-routing.module';
import { EmpresaMapPage } from './empresa-map.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaMapPageRoutingModule
  ],
  declarations: [EmpresaMapPage]
})
export class EmpresaMapPageModule {}
