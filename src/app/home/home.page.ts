import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'

//import { createClient, SupabaseClient } from '@supabase/supabase-js';
//import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public usuariID: any;
  public usuariUUID: string = "";
  public usuariEMAIL: string = "";
  public empresaexist! : boolean;
  constructor(private readonly supabase: AuthService) { }

  async ngOnInit() {
    const x = await this.supabase.user1;
    this.usuariUUID = x.data.user.id;
    this.usuariEMAIL = x.data.user.email;
    this.usuariID = await this.supabase.profile_uuid();
    console.log(this.usuariID + " " + this.usuariUUID + " " + this.usuariEMAIL);
  }
  logout() {
    this.supabase.signOut();
  }
}