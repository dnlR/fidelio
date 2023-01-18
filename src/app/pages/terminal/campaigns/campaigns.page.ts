import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CampaignService } from 'src/app/services/campaign.service';
import { CompanyService } from 'src/app/services/company.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { ModalCampaignPage } from '../modal-campaign/modal-campaign.page';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
})
export class CampaignsPage implements OnInit {

  campania!: any[];  
  company_id!: number;
  nameCompany!: any;
  campania_filtrados!: any[];
  terminal_id!: number;
  nameTerminal!: any;
  show:boolean = true;
 

  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService,
              private terminalService: TerminalService,
              private companyService: CompanyService,
              public alertCtrl: AlertController, 
              private modalController:ModalController,
              private loadingCtrl: LoadingController,          
              private router: Router
    ) {
    }

  ngOnInit() {
    this.showLoading().then(()=>{
        this.company_id = this.route.snapshot.params['company'];   
        this.terminal_id = this.route.snapshot.params['terminal'];
        this.campaignService.getCampaigns(this.company_id, 'company_id')
                              .then((response) => {this.campania = response!;
                                                  console.log(this.campania);
                                                  this.campania_filtrados = this.campania;
                                                  this.loadingCtrl.dismiss();
                                                });
        this.companyService.getCompanyName(this.company_id)
                              .then((response) => {this.nameCompany = response;
                                                  console.log(response);
                                                });  
                                                
        this.terminalService.getTerminalName(this.terminal_id)
                              .then((response) => {this.nameTerminal = response;
                                                    console.log(response);
                                                });   
    });
                
 } 
 
 // Filtrado campañas
  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
    this.campania_filtrados = this.campania.filter(d => d.name!.toLowerCase().indexOf(query) > -1);
  }
  //modal campaña
  async showCampaignModal(currentCampaign: any){
 
    let modal = await this.modalController.create({
      component: ModalCampaignPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass:'smallModal',
      handle: false,
      componentProps: {
        currentCampaign: currentCampaign,
        terminal_id:this.terminal_id
      },
    })
    await modal.present();
  }  

    //Alarma de puntos no correctos
    async presentAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        subHeader: 'Los puntos introducidos no son correctos.',
        //message: 'This is an alert!',
        buttons: ['OK'],
      });

      await alert.present();
    }   
    
    async showLoading() {
      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
        
        showBackdrop: false
      });
  
      loading.present();
    }

}


