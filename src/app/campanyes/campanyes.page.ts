import { Component, OnInit } from '@angular/core';
import { CampanyaDataService } from '../services/campanya-data.service';
import { iCampanya, iCampanyaList } from '../interfaces/iCampanya';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-campanyes',
  templateUrl: './campanyes.page.html',
  styleUrls: ['./campanyes.page.scss'],
})

export class CampanyesPage implements OnInit {
  llistatCampanyes!: iCampanyaList[];
  constructor(private campanyaDS: CampanyaDataService, private router: Router, private location: Location) { }

  async ngOnInit() {
    this.llistatCampanyes = await this.campanyaDS.campanya_getallbyEmpID(this.getUserEmpresa());
    //this.campanyaDS._test_campanya_insupd()
  }
  addCampanya() {
    this.router.navigate(["/campanyes/campanya-details/",this.getUserEmpresa(),"0"]);
  }
  getUserEmpresa():string {
    return ("1")
  }
  goBack(): void {
    this.router.navigate(["/menu-empresari"]);
  }
}
