import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsertabsPage } from './usertabs.page';

const routes: Routes = [
  {
    path: 'usertabs',
    component: UsertabsPage,
    children: [
      {
        path: 'usercards',
        loadChildren: () => import('../usercards/usercards.module').then(m => m.UsercardsPageModule)
      },
      {
        path: 'userqr',
        loadChildren: () => import('../userqr/userqr.module').then(m => m.UserqrPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'usertabs/usercards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsertabsPageRoutingModule {}
