import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private supabase: SupabaseClient //SupaBase Client

  constructor() {
    //connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  //Login terminal 
  async loginTerminal(user:string, password:string) {   
    let { data: terminal} = await this.supabase
                                              .from('terminals')
                                              .select('*')                                                                                                  
                                              .eq('terminal_user', user)                                                                                               
                                              .eq('terminal_password', password);                                                 
  return terminal    
  }

  //Get terminal name
  async getTerminalName(terminal_id:number){ 
  let { data: terminal} = await this.supabase
                                        .from('terminals')
                                        .select('*') 
                                        .eq('id', terminal_id)
                                        .single()
                                        return terminal;
  }  
}