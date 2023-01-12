import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertabs',
  templateUrl: './usertabs.page.html',
  styleUrls: ['./usertabs.page.scss'],
})
export class UsertabsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openUser() {
    this.router.navigateByUrl('/user', { replaceUrl: true });
  }

  openCompany() {
    this.router.navigateByUrl('/company', { replaceUrl: true });
  }

  openTerminal() {
    this.router.navigateByUrl('/terminal', { replaceUrl: true });
  }
}
