import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { CampaignService } from 'src/app/services/campaign.service';
import { CompanyService } from 'src/app/services/company.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserCardsService } from 'src/app/services/user-cards.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  terminal_id!: number;
  campaign_id!: number;
  company_id!: number;
  points!: number;
  campaign!: any;
  company!: any;
  terminal!: any;  
  customers: any;
  textoPuntos: string;
  users:{user: any, name: string, email: string}[] = [];
  filter_users:{user: any, name: string, email: string}[] = [];
  // direccion imagen: 'https://img.freepik.com/vector-premium/copa-ganador-felicidades-premio-triunfo-icono-victoria-ilustracion_100456-1422.jpg?w=2000';
  imageUrl='../../../../assets/winnerCup.webp';  
  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService,
              private terminalService: TerminalService,
              private companyService: CompanyService,
              private userCardsService: UserCardsService,
              private usersService: UsersService,
              private transactionsService: TransactionsService,
              public alertController: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private loadingCtrl: LoadingController,             
              private router: Router) { }

  ngOnInit() {

    this.campaign_id = this.route.snapshot.params['campaign']; 
    this.company_id = this.route.snapshot.params['company']; 
    this.points = this.route.snapshot.params['points'];
    this.terminal_id = this.route.snapshot.params ['terminal'];

    this.textoPuntos = this.points==1? 'punto': 'puntos';
    this.showLoading().then(()=>{
        //Obtener datos campaña
        this.campaignService.getCampaign(this.campaign_id)
                        .then((response) => this.campaign = response!);

        //Obtener datos empresa
        this.companyService.getCompanyName(this.company_id)
                        .then((response) => this.company = response);

        //Obtener datos terminal                     
        this.terminalService.getTerminalName(this.terminal_id)
                        .then((response) => this.terminal = response);
                              
        //obtener clientes misma campaña
        this.userCardsService.getCustomersCampaign(this.campaign_id)
                        .then((response)=>{
                                          this.customers = response;
                                          if (this.customers.length == 0){ 
                                            //avisa no hay clientes en campaña                
                                            this.errorAlarm(); 
                                            this.loadingCtrl.dismiss();
                                          } else {                                                    
                                            console.log('clientes',response);
                                            this.customers.forEach((arr:any) => {  
                                                      this.usersService.getCustomer(arr.user_id)
                                                                      .then((response)=>{                                                    
                                                                                        this.users.push({user:arr, name:response[0].name, email:response[0].email});
                                                                                        this.filter_users.push({user:arr, name:response[0].name, email:response[0].email});
                                                                                        });                                                   
                                                                                })  
                                            this.loadingCtrl.dismiss();                      
                                            };                                                                                                  

                        })
    });
  }


   // Filtrado clientes
  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
    this.filter_users = this.users.filter(d => d.name!.toLowerCase().indexOf(query) > -1);
  }



  //Muestra ventana cliente seleccionado
 
  async presentActionSheet(currentUser:any) {
    console.log('currentuser', currentUser);
    const actionSheet = await this.actionSheetCtrl.create({
      header: currentUser.name,
      subHeader: currentUser.email,
      
      buttons: [        
        {
          text: `Añadir ${this.points} ${this.textoPuntos}`,
          handler: () => {            
            this.addPoints(currentUser);
          }          
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  //Actualiza los datos del usuario en la campaña y añade
  //registro a transacciones
  addPoints(currentUser: any){
    let new_points = currentUser.user.card_points_current + (+this.points);
    let won_prizes = Math.trunc(new_points / currentUser.user.card_points);
    let remained_points = new_points % currentUser.user.card_points;
    let prizes: number = 0;
    let message_prize: string = '';
    let image:string;
    
    if (won_prizes != 0){
      prizes = won_prizes+ currentUser.user.prizes;
      message_prize = "Tienes premio!!!"
      image = this.imageUrl;
    } else {
      prizes =  currentUser.user.prizes;
      message_prize = "Sigue participando."
      image = this.campaign[0].card_main_image;
    }
    this.userCardsService.updateUserCard(currentUser.user.id, remained_points, prizes);   
    this.transactionsService.insertTransaction(currentUser.user.user_id, currentUser.user.campaign_id, +this.points, currentUser.user.card_points, remained_points, prizes, this.terminal.name, this.terminal.user_terminal);
    this.showPrize(currentUser, won_prizes, message_prize, this.points, remained_points, image);
    
  }


// Indica si el usuario obtiene premio o los puntos que consigue con la compra
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
  

//avisa su si no hay usuarios inscritos en campaña
  errorAlarm() {
    this.alertController.create({
      header: 'No hay usuarios inscritos en campaña',
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      //duration: 3000,
      showBackdrop: false
    });

    loading.present();
  }
 

}
