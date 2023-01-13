import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCampaignPageRoutingModule } from './modal-campaign-routing.module';

import { ModalCampaignPage } from './modal-campaign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCampaignPageRoutingModule
  ],
  declarations: [ModalCampaignPage]
})
export class ModalCampaignPageModule {}
