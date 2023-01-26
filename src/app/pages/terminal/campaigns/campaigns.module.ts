import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignsPageRoutingModule } from './campaigns-routing.module';

import { CampaignsPage } from './campaigns.page';
import { MaterialModule } from 'src/app/material.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignsPageRoutingModule,
    MaterialModule,
    ToolbarModule
  ],
  declarations: [CampaignsPage]
})
export class CampaignsPageModule {}
