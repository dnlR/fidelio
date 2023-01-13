import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private supabase: SupabaseClient //SupaBase Client

  constructor() {
    //connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

async getCampaigns(id_company:number, column:string){
  let { data: campaign, error } = await this.supabase
                                                    .from('campaigns')
                                                    .select('*') 
                                                    .eq(column, id_company)
                                                    return campaign;

}

async getCampaign(id_campaign:number){
  let { data: campaign, error } = await this.supabase
                                                    .from('campaigns')
                                                    .select('*') 
                                                    .eq('id', id_campaign)
                                                    return campaign;

}
}