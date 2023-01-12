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
