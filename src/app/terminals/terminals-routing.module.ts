import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminalsPage } from './terminals.page';

const routes: Routes = [
  {
    path: '',
    component: TerminalsPage
  },
  {
    path: 'terminal-details/:empresaID/:terminalID',
    loadChildren: () => import('./terminal-details/terminal-details.module').then( m => m.TerminalDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminalsPageRoutingModule {}
