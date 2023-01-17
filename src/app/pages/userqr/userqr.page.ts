import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userqr',
  templateUrl: './userqr.page.html',
  styleUrls: ['./userqr.page.scss'],
})
export class UserqrPage implements OnInit {
  QRCode: string = "";
  qrCodeDownloadLink: SafeUrl = "";

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.QRCode = user.id;
      }
    });
  }

  ngOnInit() {
    // console.log(`qr code: ${this.QRCode}`);
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
