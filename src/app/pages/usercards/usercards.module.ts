import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD:src/app/campanyes/campanyes.module.ts
import { QRCodeModule } from 'angularx-qrcode';
import { CampanyesPageRoutingModule } from './campanyes-routing.module';
=======

import { UsercardsPageRoutingModule } from './usercards-routing.module';
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards.module.ts

import { UsercardsPage } from './usercards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD:src/app/campanyes/campanyes.module.ts
    QRCodeModule,
    CampanyesPageRoutingModule
=======
    UsercardsPageRoutingModule
>>>>>>> 9cfd3dcdc3f324b98da32ee392a9d934f1e7c4c6:src/app/pages/usercards/usercards.module.ts
  ],
  declarations: [UsercardsPage]
})
export class UsercardsPageModule {}
