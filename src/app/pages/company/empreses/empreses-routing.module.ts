import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresesPage } from './empreses.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresesPage
  },
  {
    path: 'empresa-map',
    loadChildren: () => import('./empresa-map/empresa-map.module').then( m => m.EmpresaMapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresesPageRoutingModule {}