import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { EmpresaDataService } from '../services/empresa-data.service';

@Component({
  selector: 'app-menu-empresari',
  templateUrl: './menu-empresari.page.html',
  styleUrls: ['./menu-empresari.page.scss'],
})
export class MenuEmpresariPage implements OnInit {
  public usuariID: string = "";
  public usuariEMAIL: string = "";
  public empresaexist! : boolean;
  constructor(private readonly supabase: AuthService, private empresaDS:EmpresaDataService) { }

  async ngOnInit() {
    const x = await this.supabase.user1;
    this.usuariID = x.data.user.id;
    this.usuariEMAIL = x.data.user.email;
    this.empresaexist = await this.empresaDS.empresa_existforuser("1")
    if (! this.empresaexist) {
      alert("Cal crear una empresa")
    }
    console.log(this.usuariID + " " + this.usuariEMAIL);
  }
}
