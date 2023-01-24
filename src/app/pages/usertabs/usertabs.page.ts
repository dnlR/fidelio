import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usertabs',
  templateUrl: './usertabs.page.html',
  styleUrls: ['./usertabs.page.scss'],
})
export class UsertabsPage implements OnInit {

  currentUserEmail = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuController: MenuController
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
    this.menuController.enable(true, 'left-menu');
    this.menuController.enable(true, 'right-menu');
  }

  ionViewWillLeave() {
    this.menuController.enable(false, 'left-menu');
    this.menuController.enable(false, 'right-menu');
  }

  openUser() {
    this.router.navigateByUrl('/user', { replaceUrl: true });
  }

  openCompany() {
    this.router.navigateByUrl('/company', { replaceUrl: true });
  }


}
