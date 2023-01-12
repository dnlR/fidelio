import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserqrPage } from './userqr.page';

const routes: Routes = [
  {
    path: '',
    component: UserqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserqrPageRoutingModule {}
