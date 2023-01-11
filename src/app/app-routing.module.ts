import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
