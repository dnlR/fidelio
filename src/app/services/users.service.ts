import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private supabase: SupabaseClient //SupaBase Client

  constructor() {
    //connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async getCustomerName(id_customer:number){
    let { data: customer, error } = await this.supabase
                                                      .from('users')
                                                      .select('name') 
                                                      .eq('id', id_customer)
                                                      return customer;

  }
}
