import { Injectable } from '@angular/core';
import { ToastController, AlertController  } from '@ionic/angular'
import jsSHA from 'jssha'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  handlerMessage = '';
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) {
  
   }
   async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 })
    await toast.present()
  }
  str2SHA256(s:string):string {
    let shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(s);
    let hash = shaObj.getHash("HEX");
    return(hash);
  }
  async dialogConfirmation(m1:string, m2:string):Promise<boolean> {
    let r:boolean=false;
    const alert = await this.alertCtrl.create({
      header: m1,
      message: m2,
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            return(true);
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return(false);
          },
        },
      ],
    });

    await alert.present();
    return(false);
  }
}
