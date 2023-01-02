import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresesPage } from './empreses.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresesPageRoutingModule {}
