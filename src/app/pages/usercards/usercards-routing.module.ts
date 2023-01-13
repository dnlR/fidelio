import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD:src/app/menu-empresari/menu-empresari-routing.module.ts
import { MenuEmpresariPage } from './menu-empresari.page';
import { EmpresesPage } from '../empreses/empreses.page';
import { CampanyesPage } from '../campanyes/campanyes.page';

=======
import { UsercardsPage } from './usercards.page';
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD:src/app/menu-empresari/menu-empresari-routing.module.ts
    component: MenuEmpresariPage
  },
  {
    path: 'empreses/:empID',
    component: EmpresesPage
  },
  {
    path: 'campanyes/:empID',
    component: CampanyesPage
=======
    component: UsercardsPage
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercardsPageRoutingModule {}
