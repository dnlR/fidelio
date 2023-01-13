import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCardsService {

  private supabase: SupabaseClient //SupaBase Client

  constructor() {
    //connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }



  async updateUserCard(id:number, card_points_current:number, prizes:number){
    const { data, error } = await this.supabase
                                              .from('user_cards')
                                              .update({ 'card_points_current': card_points_current,
                                                        'prizes': prizes, })
                                              .eq('id', id)
                                              return data                                            
                          }
                                        
 async getUserCardByCustomerCampaing(id:string, campaign_id:number){
  const { data:userCard, error } = await this.supabase
                                              .from('user_cards')
                                              .select('*')
                                              .eq('user_id', id)
                                              .eq('campaign_id', campaign_id)
                                              .single()                                            
                                              return userCard                                            
                          }


    async getCustomersCampaign(campaign_id:number){   
      let { data: campaigns} = await this.supabase
                                                    .from('user_cards')
                                                    .select('*')     
                                                    .eq('campaign_id', campaign_id);
                                                    return campaigns;                                                   
        
  }
}
