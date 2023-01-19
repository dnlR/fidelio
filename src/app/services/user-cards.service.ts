import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCardsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async updateUserCard(id: number, card_points_current: number, prizes: number) {
    const { data, error } = await this.supabase
      .from('user_cards')
      .update({
        'card_points_current': card_points_current,
        'prizes': prizes,
      })
      .eq('id', id);

    return data;
  }

  async getUserCardByCustomerCampaing(id: string, campaign_id: number) {
    const { data: userCard, error } = await this.supabase
      .from('user_cards')
      .select('*')
      .eq('user_id', id)
      .eq('campaign_id', campaign_id)
      .single();

    return userCard;
  }

  async getCustomersCampaign(campaign_id: number) {
    let { data: campaigns } = await this.supabase
      .from('user_cards')
      .select('*')
      .eq('campaign_id', campaign_id);

    return campaigns;
  }

  async userJoinsCampaign(userId, campaign) {
    const { data: userCard, error } = await this.supabase
      .from('user_cards')
      .insert([
        {
          user_id: userId,
          campaign_id: campaign.id,
          card_points: campaign.card_points,
          card_points_current: 0,
          prizes: 0,
        },
      ]);

    return userCard;
  }

  async userLeavesCampaign(userId, userCardId) {
    const { data, error } = await this.supabase
      .from('user_cards')
      .delete()
      .eq('id', userCardId)
      .eq('user_id', userId);
    
    return data;
  }

  async getUserCardsForUser(userId) {
    // let { data: userCards, error } = await this.supabase
    //   .from('user_cards')
    //   .select('*')
    //   .eq('user_id', userId);

    let { data: userCards, error } = await this.supabase
      .from('user_cards')
      .select(`
        *,
        campaigns(*)
      `)
      .eq('user_id', userId);

    return userCards;
  }
}
