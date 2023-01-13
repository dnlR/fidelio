import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<<< HEAD:src/app/qr-code/qr-code-routing.module.ts
import { QrCodePage } from './qr-code.page';
========
import { UsercardsPage } from './usercards.page';
>>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<<< HEAD:src/app/qr-code/qr-code-routing.module.ts
    component: QrCodePage
========
    component: UsercardsPage
>>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<<< HEAD:src/app/qr-code/qr-code-routing.module.ts
export class QrCodePageRoutingModule {}
========
export class UsercardsPageRoutingModule {}
>>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards-routing.module.ts
