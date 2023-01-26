import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginTerminalPageRoutingModule } from './login-terminal-routing.module';

import { LoginTerminalPage } from './login-terminal.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginTerminalPageRoutingModule,
    ReactiveFormsModule,
    ToolbarModule
  ],
  declarations: [LoginTerminalPage]
})
export class LoginTerminalPageModule {}
