import { Injectable } from '@angular/core';
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { iCampanya } from '../interfaces/iCampanya';
import { StorageSupabaseService } from './storage-supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root',
})
export class CampanyaDataService {

  private supabase: SupabaseClient

  constructor(private storageDS: StorageSupabaseService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async _test_campanya_insupd() {
    const cam:iCampanya={
      company_id:1234,
      id:Math.floor(Math.random()*1000),
      name:"Pinso Gratis",
      type:"S",
      active:true,
      card_color:"rgba(48, 48, 48, 1)",
      card_main_image:"https://www.google.es/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",//URL storage
      card_title:"Titulo1",
      card_subtitle:"Titulo2",
      card_foot_note:"Titulo3",
      card_logo:"https://www.google.es/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",//URL storage
      card_points:10,
      description:"DescP",
      conditions:"DescL",
      modification_date:new Date(),
      modification_user:""
    }
    const x = await this.campanya_insupd(cam);
    if (x!=null)
      console.log(x.message);
  }    

  async campanya_getbyid(empresaID:string, campanyaID:string) {
    const { data, error } = await this.supabase
    .from('campaigns')
    .select()
    .eq("company_id", empresaID)
    .eq("id", campanyaID)
    .single()
    return data!
  }

  async campanya_getallbyEmpID(empresaID:string) {
    //Retorna nomes ID, Nom, Activa, Logo
    const { data, error } = await this.supabase
    .from('campaigns')
    .select("company_id, id, name, active, card_main_image")
    .eq("company_id", empresaID)
    .order('active', { ascending: false })
    console.log(error);
    return data!    
  }

  async campanya_insupd(campanya:iCampanya):Promise<PostgrestError|null>{
    campanya.modification_date=new Date();
    campanya.modification_user=this.storageDS.user;
    //Cal eliminar ja que la bd genera serial sol
    //Si camID es 0 es un NEW
    if (campanya.id==0) {
      campanya.id=undefined
    }
    const { data, error } = await this.supabase.from('campaigns').upsert(campanya)
    return error
  }

  campanya_getnewid(empresaID:string):number {
    return (Math.floor(Math.random()*10000));
  }

  async campanya_delete(camid:number):Promise<PostgrestError|null> {
    //No utilitzar!
    const { data, error } = await this.supabase
    .from('campaigns')
    .delete()
    .eq("id", camid)
    return error
  } 
}
