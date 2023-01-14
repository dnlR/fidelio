import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FillUserInfoComponent } from './components/fill-user-info/fill-user-info.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { FirstTimeGuard } from './guards/first-time.guard';
import { ShowTutorialGuard } from './guards/show-tutorial.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'fill-user-info',
    component: FillUserInfoComponent,
    canActivate: [AuthenticatedGuard, FirstTimeGuard]
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
    canActivate: [AuthenticatedGuard, ShowTutorialGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/usertabs/usertabs.module').then(m => m.UsertabsPageModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login-terminal',
    loadChildren: () => import('./pages/terminal/login-terminal/login-terminal.module').then( m => m.LoginTerminalPageModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'campaigns/:company/:terminal',
    loadChildren: () => import('./pages/terminal/campaigns/campaigns.module').then( m => m.CampaignsPageModule)
  },
 
  {
    path: 'modal-campaign',
    loadChildren: () => import('./pages/terminal/modal-campaign/modal-campaign.module').then( m => m.ModalCampaignPageModule)
  },
  {
    path: 'reader-qr/:company/:campaign/:points/:terminal',
    loadChildren: () => import('./pages/terminal/reader-qr/reader-qr.module').then( m => m.ReaderQrPageModule)
  },
  {
    path: 'customers/:company/:campaign/:points/:terminal',
    loadChildren: () => import('./pages/terminal/customers/customers.module').then( m => m.CustomersPageModule)
  },
  
  {
    path: 'stats/:company/:campaign/:terminal',
    loadChildren: () => import('./pages/terminal/stats/stats.module').then( m => m.StatsPageModule)
  },
  {
    path: '**',
    redirectTo: '/',
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
