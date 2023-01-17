import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { ZipCode } from 'src/app/interfaces/zipcode';


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

  async getMatchingZipCodesForZipCode(code): Promise<ZipCode[]> {
    const { data: zip_codes, error } = await this.supabase
      .from('zip_codes')
      .select("id, zip_code, city")
      .ilike('zip_code', `%${code}%`);

    return zip_codes;
  }
}
