import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { iEmpresa } from "../interfaces/iEmpresa"
import { StorageSupabaseService } from './storage-supabase.service';
import { AuthService } from '../services/auth.service'
import { GeoService } from '../services/geo.service'


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root',
})
export class EmpresaDataService {

  private supabase: SupabaseClient

  constructor(private toastCtrl: ToastController, private storageDS: StorageSupabaseService, private AuthS:AuthService, private geoS:GeoService) {
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
    let errorgeo:boolean=false;
    const x = await this.AuthS.getUser();
    empresa.modification_date=new Date();
    empresa.modification_user_id=x.id
    empresa.uuser_id=x.id
  
    //const address = "111acsdsedseq";  
    const address=empresa.address + ", " + empresa.zip_code_id + " " + empresa.city + " " + empresa.country;
    //const r = await this.geoS.ggdecode1(address)
    let res!:any;
    await this.geoS.ggdecode1(address)
    .then((resultado) => {
      console.log("Resultado", resultado);
      res=resultado;
    })
    .catch((error) => {
      console.log("Error capturado", error);
      res=error;
    });
    console.log(res);
    if (res!=null) {
      empresa.coor_lat=res[0]
      empresa.coor_lng=res[1]
    //console.log(r.results![0].geometry.location.lat());
    //console.log(r.results![0].geometry.location.lng());
    // const cc:{results, status} = await this.geoS.ggdecode(ad)
    // if (cc.status == google.maps.GeocoderStatus.OK) {
    //   console.log(cc.results![0].geometry.location.lat());
    //   console.log(cc.results![0].geometry.location.lng());
    // 
    }
    else {
      errorgeo=true;
    }
    const { data, error } = await this.supabase.from('companies').upsert(empresa)
    if (errorgeo) {
      const e: PostgrestError={
        message:"Les dades han sigut guardades correctament, però direcció no ha pogut ser geolocalitzada, revisi les dades de l'adreça",
        details:"Les dades han sigut guardades correctament, però direcció no ha pogut ser geolocalitzada, revisi les dades de l'adreça",
        hint:"Les dades han sigut guardades correctament, però direcció no ha pogut ser geolocalitzada, revisi les dades de l'adreça",
        code:"0",
      }
      return e
    }
    else
      return error
  }

  async empresa_existforuser(uuid:string) {
    const { data, error } = await this.supabase
    .from('companies')
    .select()
    .eq('uuser_id', uuid)
    .single()
    console.log(uuid)
    console.log(data)
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
  async empresa_getformap(swlat:number, swlng:number, nelat:number, nelng:number) {
    const { data, error } = await this.supabase
    .from('companies')
    .select()
    .gt("coor_lat", swlat)
    .lt("coor_lat", nelat)
    .gt("coor_lng", swlng)
    .lt("coor_lng", nelng)
    return data!
  }
}
