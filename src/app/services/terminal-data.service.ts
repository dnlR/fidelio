import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { empty } from 'rxjs';
import { environment } from '../../environments/environment'
import { iTerminal } from "../interfaces/iTerminal"
import { StorageSupabaseService } from './storage-supabase.service';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TerminalDataService {
  private supabase: SupabaseClient

  constructor(private storageDS: StorageSupabaseService, private AuthS:AuthService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // async _test_campanya_insupd() {
  //   const ter:iTerminal={
  //     company_id: 1,
  //     TerminalNom: "T1",
  //     TerminalDescripcio: "Terminal1",
  //     TerminalPassword: "1234",
  //     TerminalActiu: true,
  //     TerminalModificacioDate: new Date(),
  //     TerminalModificacioUsuari: "",
  //     TerminalID: Math.floor(Math.random()*1000)
  //   }
  //   const x = await this.terminal_insupd(ter);
  //   if (x!=null)
  //     console.log(x.message);
  // }    

  async terminal_getbyid(empresaID:string, terminalID:string) {
    const { data, error } = await this.supabase
    .from('terminals')
    .select()
    .eq("company_id", empresaID)
    .eq("id", terminalID)
    .single()
    return data!
  }

  async terminal_getallbyEmpID(terminalID:string) {
    //Retorna nomes ID, Nom, Activa, Logo, no actius al final
    const { data, error } = await this.supabase
    .from('terminals')
    .select("company_id, id, name, active")
    .eq("company_id", terminalID)
    .order('active', { ascending: false })
    console.log(error);
    return data!    
  }

  async terminal_insupd(terminal:iTerminal):Promise<PostgrestError|null>{
    terminal.modification_date=new Date();
    terminal.modification_user=await this.AuthS.profile_uuid();
    //Cal elimnar
    if (terminal.id==0) {
      let e!:number
      terminal.id=e
    }
    const { data, error } = await this.supabase.from('terminals').upsert(terminal)
    return error
  }
  terminal_getnewid(empresaID:string):number {
    return (Math.floor(Math.random()*10000));
  }
  async terminal_delete(camid:number):Promise<PostgrestError|null> {
    //No utilitzar!
    const { data, error } = await this.supabase
    .from('terminals')
    .delete()
    .eq("id", camid)
    return error
  } 
}
