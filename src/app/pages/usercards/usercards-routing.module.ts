import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD
<<<<<<< HEAD:src/app/menu-empresari/menu-empresari-routing.module.ts
import { MenuEmpresariPage } from './menu-empresari.page';
import { EmpresesPage } from '../empreses/empreses.page';
import { CampanyesPage } from '../campanyes/campanyes.page';

=======
import { UsercardsPage } from './usercards.page';
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
=======
<<<<<<<< HEAD:src/app/qr-code/qr-code-routing.module.ts
import { QrCodePage } from './qr-code.page';
========
import { UsercardsPage } from './usercards.page';
>>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
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
=======
<<<<<<<< HEAD:src/app/qr-code/qr-code-routing.module.ts
    component: QrCodePage
========
    component: UsercardsPage
>>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD
export class UsercardsPageRoutingModule {}
=======
<<<<<<<< HEAD:src/app/qr-code/qr-code-routing.module.ts
export class QrCodePageRoutingModule {}
========
export class UsercardsPageRoutingModule {}
>>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6
