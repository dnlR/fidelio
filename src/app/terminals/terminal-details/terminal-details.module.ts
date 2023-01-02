import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminalDetailsPageRoutingModule } from './terminal-details-routing.module';

import { TerminalDetailsPage } from './terminal-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TerminalDetailsPageRoutingModule
  ],
  declarations: [TerminalDetailsPage]
})
export class TerminalDetailsPageModule {}
