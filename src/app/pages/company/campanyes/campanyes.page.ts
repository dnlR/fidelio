import { Component, OnInit } from '@angular/core';
import { CampanyaDataService } from '../../../services/campanya-data.service';
import { iCampanya, iCampanyaList } from '../../../interfaces/iCampanya';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-campanyes',
  templateUrl: './campanyes.page.html',
  styleUrls: ['./campanyes.page.scss'],
})

export class CampanyesPage implements OnInit {
  llistatCampanyes!: iCampanyaList[];
  empID: string = "";
  constructor(
    private campanyaDS: CampanyaDataService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private menuController: MenuController
  ) { }

  async ngOnInit() {
    //this.campanyaDS._test_campanya_insupd()
  }
  
  async ionViewWillEnter() {
    this.empID = this.route.snapshot.paramMap.get('empID')!;
    this.llistatCampanyes = await this.campanyaDS.campanya_getallbyEmpID(this.empID);
    this.menuController.enable(true, 'right-menu');
    this.menuController.enable(true, 'left-menu');
  }

  ionViewWillLeave() {
    this.menuController.enable(false, 'left-menu');
    this.menuController.enable(false, 'right-menu');
  }

  addCampanya() {
    this.router.navigate(["/campanyes/campanya-details/", this.empID, "0"]);
  }

  goBack(): void {
    this.router.navigate(["/menu-empresari"]);
  }
}
