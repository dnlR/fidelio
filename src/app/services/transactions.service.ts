import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private supabase: SupabaseClient //SupaBase Client

  constructor() {
    //connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }
  async insertTransaction(user_id:number, campaign_id:number, earned_card_points:number, card_points:number, card_points_total:number, prizes:number, terminal_name:string, terminal_user:string){
    const { data, error } = await this.supabase
                                              .from('transactions_user_cards_points')
                                              .insert([
                                                { 'user_id': user_id, 'campaign_id': campaign_id, 'earned_card_points':earned_card_points, 'card_points':card_points, 'card_points_total':card_points_total, 'prizes':prizes, 'terminal_name':terminal_name,'terminal_user':terminal_user },
                                              ])
  }

  async getTransactionByCampaign(campaign_id:number){
    const { data:transactions, error } = await this.supabase
                                              .from('transaction_by_user')
                                              .select('*')
                                              .eq('campaign_id', campaign_id)
                                              return transactions;
  }
}
