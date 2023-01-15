import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { CampaignService } from 'src/app/services/campaign.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserCardsService } from 'src/app/services/user-cards.service';


@Component({
  selector: 'app-reader-qr',
  templateUrl: './reader-qr.page.html',
  styleUrls: ['./reader-qr.page.scss'],
})
export class ReaderQrPage implements OnInit {

  scanActive: boolean = false;  
  mobileweb: boolean = false;
  campaign_id!: number;
  campaign!: any;
  company_id!: number;
  points!: number;
  terminal_id!: number;
  terminal: any;
  // direccion imagen'https://img.freepik.com/vector-premium/copa-ganador-felicidades-premio-triunfo-icono-victoria-ilustracion_100456-1422.jpg?w=2000';
  imageUrl='../../../../assets/winnerCup.webp';  
  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService,
              private terminalService: TerminalService,
              private userCardsService: UserCardsService,
              private transactionsService: TransactionsService,
              public platform: Platform,
              public alertController: AlertController,
              private router:Router) { }

  ngOnInit() {

    this.campaign_id = this.route.snapshot.params['campaign']; 
    this.company_id = this.route.snapshot.params['company']; 
    this.points = this.route.snapshot.params['points'];
    this.terminal_id = this.route.snapshot.params ['terminal'];
    
    //obtener datos campaña
    this.campaignService.getCampaign(this.campaign_id)
    .then((response) => {this.campaign = response!
                              console.log('campaña', this.campaign);
                      });
    
    //obtener datos terminal                     
    this.terminalService.getTerminalName(this.terminal_id)
        .then((response) => {this.terminal = response;
                              console.log(response);
                          });
    
    // La libreria barcodescanner no funciona en web por lo que debemos
    // distinguir el tipo de plataforma
    console.log('es la plataforma hibrida: ', this.platform.is('hybrid'));
    console.log('es la plataforma desktop: ', this.platform.is('desktop'));
    console.log('es la plataforma mobileweb: ', this.platform.is('mobileweb'));

    if (this.platform.is('mobileweb') || this.platform.is('desktop')){
      this.mobileweb=true;
    } else {
      this.mobileweb=false;
    } 
  }
 //Permisos Lector QR
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
        alert('Datos cliente leídos');        
        this.sumaPuntos(result.content!);  
      
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
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  //Actualizamos datos usuario en campaña y añadimos registro en transaction
  sumaPuntos(idUSer: string){

    this.userCardsService.getUserCardByCustomerCampaing(idUSer, this.campaign_id)
                    .then((response) => {
                      
                        let new_points = response.card_points_current + (+this.points);
                        let won_prizes = Math.trunc(new_points / response.card_points);
                        let remained_points = new_points % response.card_points;
                        let prizes: number = 0;
                        let message_prize: string = '';  
                        let image:string;                    
                        
                        if (won_prizes != 0){
                          prizes = won_prizes+ response.prizes;
                          message_prize = "Tienes premio!!!"
                          image = this.imageUrl;
                        } else {
                          prizes =  response.prizes;
                          message_prize = "Sigue participando."
                          image = this.campaign[0].card_main_image;
                        }
                        //actualizamos la tabla user_card y guardamos la nueva transaccion en la tabla transaction
                        this.userCardsService.updateUserCard(response.id, remained_points, prizes);   
                        this.transactionsService.insertTransaction(response.user_id, response.campaign_id, +this.points, response.card_points, remained_points, prizes, this.terminal.name, this.terminal.user_terminal);
                        this.showPrize(response, won_prizes, message_prize, this.points, remained_points, image);
                        console.log('currentUser', response);
                      
                      })
                      .catch((error)=>{console.log('Usuario no inscrito en campaña.');
                                        this.errorAlarm();
                    });
    
  }
 //Muestra si el cliente obtiene premio o los puntos conseguidos con la nueva compra
  showPrize(currentUser: any, won_prizes:number, message_prize:string, points:number, remained_points:number, image:string) {
    this.alertController.create({
      header: message_prize,
      subHeader: this.campaign[0].name,
      cssClass: 'prize-alert',
       message: `<img src="${image}" class="card-alert">               
                 <ion-item class="item-alert">Puntos añadidos: ${points}</ion-item>
                 <ion-item class="item-alert">Puntos actuales: ${remained_points} </ion-item>
                 `,               
      buttons: [
        {
          text: ' Volver a campañas',
          handler: () => {
            this.router.navigate(['/campaigns', this.company_id, this.terminal_id]);
          },
        },
        
      ],
      
    }).then(res => {
      res.present();
    });
  }

// Alarma de que el usuario no está inscrito en la campaña
  errorAlarm() {
    this.alertController.create({
      header: 'Usuario no inscrito en campaña',
      //subHeader: 'Beware lets confirm',
      message: 'Solicite al usuario que se inscriba en la campaña',
      buttons: [
        {
          text: 'Volver a campañas',
          handler: () => {
            this.router.navigate(['/campaigns', this.company_id, this.terminal_id]);
          }
        },
       
      ]
    }).then(res => {
      res.present();
    });
  }

}
