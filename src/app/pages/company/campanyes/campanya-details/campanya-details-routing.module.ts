import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampanyaDetailsPage } from './campanya-details.page';

const routes: Routes = [
  {
    path: '',
    component: CampanyaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanyaDetailsPageRoutingModule {}
