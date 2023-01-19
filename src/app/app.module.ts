import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthService } from './services/auth.service'
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
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';

import { QRCodeModule } from 'angularx-qrcode';
import { DummyCampaignComponent } from './components/dummy-campaign/dummy-campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FillUserInfoComponent,
    UpdateUserInfoComponent,
    TutorialComponent,
    DummyCampaignComponent
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
    MaterialModule,
    QRCodeModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
