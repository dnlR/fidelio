import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FillUserInfoComponent } from './components/fill-user-info/fill-user-info.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { FirstTimeGuard } from './guards/first-time.guard';
import { ShowTutorialGuard } from './guards/show-tutorial.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DummyCampaignComponent } from './components/dummy-campaign/dummy-campaign.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
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
    path: 'update-user-info',
    component: UpdateUserInfoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'dummy-campaign',
    component: DummyCampaignComponent
  },
  {
    path: 'terminals/terminal-details/:empID/:terID',
    loadChildren: () => import('./pages/company/terminals/terminal-details/terminal-details.module').then( m => m.TerminalDetailsPageModule)
  },
  {
    path: 'campanyes/campanya-details/:empID/:camID',
    loadChildren: () => import('./pages/company/campanyes/campanya-details/campanya-details.module').then( m => m.CampanyaDetailsPageModule)
  },
  {
    path: 'empreses',
    loadChildren: () => import('./pages/company/empreses/empreses.module').then( m => m.EmpresesPageModule)
  },
  {
    path: 'empreses-maps',
    loadChildren: () => import('./pages/company/empreses/empresa-map/empresa-map.module').then( m => m.EmpresaMapPageModule)
  },
  {
    path: 'menu-empresari',
    loadChildren: () => import('./pages/company/menu-empresari/menu-empresari.module').then( m => m.MenuEmpresariPageModule)
  },
  {
    path: 'terminals/:empID',
    loadChildren: () => import('./pages/company/terminals/terminals.module').then( m => m.TerminalsPageModule)
  },
  {
    path: 'campanyes/:empID',
    loadChildren: () => import('./pages/company/campanyes/campanyes.module').then( m => m.CampanyesPageModule)
  },
  {
    path: 'qrcode/:QRCode',
    loadChildren: () => import('./pages/company/qr-code/qr-code.module').then( m => m.QrCodePageModule)
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
