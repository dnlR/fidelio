import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { AuthService } from '../../../services/auth.service'
import { EmpresaDataService } from '../../../services/empresa-data.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-menu-empresari',
  templateUrl: './menu-empresari.page.html',
  styleUrls: ['./menu-empresari.page.scss'],
})
export class MenuEmpresariPage implements OnInit {
  public usuariID: string = "";
  public usuariEMAIL: string = "";
  public empresaID: string;
  public empresaexist!: boolean;
  leftMenuId;
  rightMenuId;

  constructor(
    private readonly supabase: AuthService,
    private empresaDS: EmpresaDataService,
    private utilsDS: UtilsService,
    private msgService: MessageService,
    private toolbarService: ToolbarService
  ) { }

  async ngOnInit() {
    const x = await this.supabase.getUser();
    this.usuariID = x.id;
    this.usuariEMAIL = x.email;
    this.empresaexist = await this.empresaDS.empresa_existforuser(this.usuariID)
    if (!this.empresaexist) {
      this.utilsDS.createNotice("Crea tu empresa desde la opcion Perfil de Empresa")
    }
    else {
      this.empresaID = await this.empresaDS.empresa_getfromuser(this.usuariID)
    }
    //console.log(this.utilsDS.dialogConfirmation("Hola", "Que dius?"));
    console.log(this.usuariID + " " + this.usuariEMAIL);
  }

  ionViewWillEnter() {
    this.msgService.sendTitleMsg('Empresa');
    this.toolbarService.sendShowToolbar(true);
  }

  logout() {
    this.supabase.logout();
  }

}
