import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaMapPage } from './empresa-map.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaMapPageRoutingModule {}
