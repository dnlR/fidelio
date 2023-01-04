import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampanyesPage } from './campanyes.page';

const routes: Routes = [
  {
    path: '',
    component: CampanyesPage
  },
  {
    path: 'campanyes/campanya-details/:empID/:camID',
    loadChildren: () => import('./campanya-details/campanya-details.module').then( m => m.CampanyaDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanyesPageRoutingModule {}
