import { Component } from '@angular/core';
//import { createClient, SupabaseClient } from '@supabase/supabase-js';
//import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public usuariID: string = "";
  public usuariEMAIL: string = "";  
//  private supabase: SupabaseClient;

  constructor() {

  }
}
