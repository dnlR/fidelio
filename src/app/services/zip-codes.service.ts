import { Injectable } from '@angular/core';
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { iEmpresa } from "../interfaces/iEmpresa"

@Injectable({
  providedIn: 'root'
})
export class ZipCodesService {

  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

 async zip_getbycode(country_code:string, zip_code:string) {
    const { data, error } = await this.supabase
    .from('zip_codes')
    .select("city, province, region")
    .eq("country_code", country_code)
    .eq("zip_code", zip_code)
    return data
  }
}
