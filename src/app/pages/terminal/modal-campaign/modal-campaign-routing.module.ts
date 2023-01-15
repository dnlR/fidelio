import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCampaignPage } from './modal-campaign.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCampaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCampaignPageRoutingModule {}
