import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercardsPage } from './usercards.page';

const routes: Routes = [
  {
    path: '',
    component: UsercardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercardsPageRoutingModule {}
