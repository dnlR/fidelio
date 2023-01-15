import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-campaign',
  templateUrl: './modal-campaign.page.html',
  styleUrls: ['./modal-campaign.page.scss'],
})
export class ModalCampaignPage implements OnInit {
  @Input() currentCampaign: any;
  @Input() terminal_id: number;
  points: number;
 
  
  constructor(private modalController:ModalController,
              private router: Router,            
            ) {}

  ngOnInit() {}
  dismiss(){
    this.modalController.dismiss();
  }

  qr(){
    this.dismiss();    
    this.router.navigate(['/reader-qr', this.currentCampaign.company_id, this.currentCampaign.id, this.points, this.terminal_id]);
  }
  manual(){
    this.dismiss();    
    this.router.navigate(['/customers', this.currentCampaign.company_id, this.currentCampaign.id, this.points, this.terminal_id]);
  }

  stats(){
    this.dismiss(); 
    this.router.navigate(['/stats', this.currentCampaign.company_id, this.currentCampaign.id, this.terminal_id]);
  }

}