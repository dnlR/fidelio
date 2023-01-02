import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEmpresariPage } from './menu-empresari.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEmpresariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEmpresariPageRoutingModule {}
