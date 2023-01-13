import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'terminals/terminal-details/:empID/:terID',
    loadChildren: () => import('./terminals/terminal-details/terminal-details.module').then( m => m.TerminalDetailsPageModule)
  },
  {
    path: 'campanyes/campanya-details/:empID/:camID',
    loadChildren: () => import('./campanyes/campanya-details/campanya-details.module').then( m => m.CampanyaDetailsPageModule)
  },
  {
    path: 'empreses',
    loadChildren: () => import('./empreses/empreses.module').then( m => m.EmpresesPageModule)
  },
  {
    path: 'menu-empresari',
    loadChildren: () => import('./menu-empresari/menu-empresari.module').then( m => m.MenuEmpresariPageModule)
  },
  {
    path: 'terminals/:empID',
    loadChildren: () => import('./terminals/terminals.module').then( m => m.TerminalsPageModule)
  },
  {
    path: 'campanyes/:empID',
    loadChildren: () => import('./campanyes/campanyes.module').then( m => m.CampanyesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'qrcode/:QRCode',
    loadChildren: () => import('./qr-code/qr-code.module').then( m => m.QrCodePageModule)
  },

=======
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
    path: '**',
    redirectTo: '/',
  },
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
