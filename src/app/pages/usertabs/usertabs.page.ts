import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-usertabs',
  templateUrl: './usertabs.page.html',
  styleUrls: ['./usertabs.page.scss'],
})
export class UsertabsPage implements OnInit {

  currentUserEmail = '';
  leftMenuId;
  rightMenuId;

  constructor(
    private router: Router,
    private authService: AuthService,
    private msgService: MessageService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUserEmail = user.email;
      }
    });
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.msgService.sendTitleMsg('Cliente');
  }

  openUser() {
    this.router.navigateByUrl('/user', { replaceUrl: true });
  }

  openCompany() {
    this.router.navigateByUrl('/company', { replaceUrl: true });
  }
}
