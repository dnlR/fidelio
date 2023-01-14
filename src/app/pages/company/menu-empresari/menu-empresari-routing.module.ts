import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEmpresariPage } from './menu-empresari.page';
import { EmpresesPage } from '../empreses/empreses.page';
import { CampanyesPage } from '../campanyes/campanyes.page';


const routes: Routes = [
  {
    path: '',
    component: MenuEmpresariPage
  },
  {
    path: 'empreses/:empID',
    component: EmpresesPage
  },
  {
    path: 'campanyes/:empID',
    component: CampanyesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEmpresariPageRoutingModule {}
