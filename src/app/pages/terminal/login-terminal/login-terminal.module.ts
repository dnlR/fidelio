import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginTerminalPageRoutingModule } from './login-terminal-routing.module';

import { LoginTerminalPage } from './login-terminal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginTerminalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginTerminalPage]
})
export class LoginTerminalPageModule {}
