import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { iEmpresa } from "../interfaces/iEmpresa"
import { StorageSupabaseService } from './storage-supabase.service';
import { AuthService } from '../services/auth.service'


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root',
})
export class EmpresaDataService {

  private supabase: SupabaseClient

  constructor(private toastCtrl: ToastController, private storageDS: StorageSupabaseService, private AuthS:AuthService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

 async empresa_getbyuserid(uuid:string) {
    const { data, error } = await this.supabase
    .from('companies')
    .select()
    .eq("uuser_id", uuid)
    .single()
    return data!
  }

  async empresa_insupd(empresa:iEmpresa){
    empresa.modification_date=new Date();
    empresa.modification_user_id=this.AuthS.sp_userID;
    empresa.uuser_id=this.AuthS.sp_userID;
    const { data, error } = await this.supabase.from('companies').upsert(empresa)
    return error
  }

  async empresa_existforuser(uuid:string) {
    const { data, error } = await this.supabase
    .from('companies')
    .select()
    .eq("uuser_id", uuid)
    .single()
    return (data!=null)
  }

  async empresa_getfromuser(uuid:string) {
    const { data, error } = await this.supabase
    .from('companies')
    .select()
    .eq("uuser_id", uuid)
    .single()
    return (data.id)
  }

  async empresa_delete(empid:number):Promise<PostgrestError|null> {
    //No utilitzar!
    const { data, error } = await this.supabase
    .from('companies')
    .delete()
    .eq("id", empid)
    return error
  } 
}
