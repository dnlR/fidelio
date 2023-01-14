import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  QRCode:string="";
  qrCodeDownloadLink:SafeUrl="";
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.QRCode = this.route.snapshot.paramMap.get('QRCode')!;
  }
  goBack(): void {
    // this.router.navigate(["/menu-empresari"]);
    this.location.back();
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
