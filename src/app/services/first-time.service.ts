import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeService {
  private supabase: SupabaseClient;

  constructor(private authService: AuthService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getFirstTimeForCurrentUser() {
    const user = await this.getCurrentUser();

    let { data: first_time, error } = await this.supabase
      .from('first_time')
      .select('first_time')
      .eq('user_id', user.id)
      .single();

    return first_time;
  }

  async setFirstTimeForCurrentUser() {
    const user = await this.getCurrentUser();

    const { data, error } = await this.supabase
      .from('first_time')
      .insert([
        { user_id: user.id, first_time: true, done_tutorial: false },
      ]);
  }

  async updateFirstTimeForCurrentUser() {
    const user = await this.getCurrentUser();

    const { data, error } = await this.supabase
      .from('first_time')
      .update({ first_time: false })
      .eq('user_id', user.id);
  }

  async itsFirstTimeForCurrentUser() {
    const itsFirstTime = await this.getFirstTimeForCurrentUser();

    if (itsFirstTime === null) {
      this.setFirstTimeForCurrentUser();
      return true;
    } else {
      if (itsFirstTime && itsFirstTime.first_time === 'true') {
        return true;  
      } else {
        return false;  
      }
    }
  }

  async currentUserHasDoneTutorial() {
    const user = await this.getCurrentUser();

    let { data: done_tutorial, error } = await this.supabase
      .from('first_time')
      .select('done_tutorial')
      .eq('user_id', user.id)
      .single();

    return done_tutorial;
  }

  async updateDoneTutorialForCurrentUser() {
    const user = await this.getCurrentUser();

    const { data, error } = await this.supabase
      .from('first_time')
      .update({ done_tutorial: true })
      .eq('user_id', user.id);
  }

  async getCurrentUser() {
    return await this.authService.getUser();
  }
}
