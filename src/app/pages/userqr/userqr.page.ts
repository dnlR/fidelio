import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { CampaignService } from 'src/app/services/campaign.service';
import { UserCardsService } from 'src/app/services/user-cards.service';


@Component({
  selector: 'app-userqr',
  templateUrl: './userqr.page.html',
  styleUrls: ['./userqr.page.scss'],
})
export class UserqrPage implements OnInit {
  QRCode: string = "";
  scanActive: boolean = false;
  mobileweb: boolean = false;

  constructor(
    public platform: Platform,
    private authService: AuthService,
    private campaignService: CampaignService,
    private userCardService: UserCardsService
  ) {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.QRCode = user.id;
      }
    });
  }

  ngOnInit() {
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.mobileweb = true;
    } else {
      this.mobileweb = false;
    }
  }

  async ionViewWillEnter() {
    this.QRCode = await this.authService.getCurrentUserId();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      //necesario para que camara lea QR
      document.querySelector('body')!.classList.add('scanner-active');

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        // result.content es empresaId-campañaId
        const campaignId = result.content!.split('-')[1];
        this.currentUserJoinCampaign(campaignId);
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
    document.querySelector('body')!.classList.remove('scanner-active');
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
    document.querySelector('body')!.classList.remove('scanner-active');
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan().catch((err) => {});
    this.scanActive = false;
    document.querySelector('body')!.classList.remove('scanner-active');
  }

  async currentUserJoinCampaign(campaignId: string) {
    let campaign = null;
    await this.campaignService.getCampaign(+campaignId)
      .then((response) => { campaign = response![0] });

    if (campaign) {
      const currentUserId = await this.authService.getCurrentUserId();
      this.userCardService.userJoinsCampaign(currentUserId, campaign);
      alert(`You successfully joined this campaign!`);
    }
  }
}
