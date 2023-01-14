import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';
import { NgChartsModule } from 'ng2-charts';

import { StatsPage } from './stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    NgChartsModule
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
