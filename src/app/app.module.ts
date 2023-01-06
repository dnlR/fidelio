import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GravatarModule } from 'ngx-gravatar';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { FillUserInfoComponent } from './components/fill-user-info/fill-user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FillUserInfoComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    GravatarModule,
    MaterialModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
