import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReaderQrPage } from './reader-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ReaderQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReaderQrPageRoutingModule {}
