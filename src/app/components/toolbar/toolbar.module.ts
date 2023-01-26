import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
  ]
})
export class ToolbarModule { }
