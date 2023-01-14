import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminalDetailsPage } from './terminal-details.page';

const routes: Routes = [
  {
    path: '',
    component: TerminalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminalDetailsPageRoutingModule {}
