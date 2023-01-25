import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { UpdateUser } from '../models/update-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getCustomer(id_customer: number) {
    let { data: customer, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id_customer)
    return customer;
  }

  async getUserById(id: string) {
    let { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    return user;
  }

  async createUser(user: User) {
    return await this.supabase
      .from('users')
      .insert([
        {
          id: user.id,
          email: user.email,
          name: user.name,
          address: user.address,
          zipcode: user.zipcode,
          phone: user.phone,
          tos_accepted: user.tos_accepted,
        },
      ]);
  }

  async updateUser(user: UpdateUser) {
    return await this.supabase
      .from('users')
      .update({ name: user.name, zipcode: user.zipcode, address: user.address, phone: user.phone })
      .eq('id', user.id)
  }
}
