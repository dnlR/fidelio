import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { GravatarModule } from 'ngx-gravatar';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule,
    GravatarModule
  ],
  exports: [
    ToolbarComponent,
  ]
})
export class ToolbarModule { }
