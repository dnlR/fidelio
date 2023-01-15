import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { EmpresaDataService } from '../../../services/empresa-data.service';

@Component({
  selector: 'app-menu-empresari',
  templateUrl: './menu-empresari.page.html',
  styleUrls: ['./menu-empresari.page.scss'],
})
export class MenuEmpresariPage implements OnInit {
  public usuariID: string = "";
  public usuariEMAIL: string = "";
  public empresaID: string;
  public empresaexist! : boolean;
  constructor(private readonly supabase: AuthService, private empresaDS:EmpresaDataService) { }

  async ngOnInit() {
    const x = await this.supabase.getUser();
    this.usuariID = x.id;
    this.usuariEMAIL = x.email;
    this.empresaexist = await this.empresaDS.empresa_existforuser(this.usuariID)
    if (! this.empresaexist) {
      alert("Cal crear una empresa")
    }
    else {
      this.empresaID = await this.empresaDS.empresa_getfromuser(this.usuariID)
    }
    console.log(this.usuariID + " " + this.usuariEMAIL);
  }
}
