import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private supabase: SupabaseClient //SupaBase Client

  constructor() {
    //connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   async getCompanyName(id:number) {  
    let { data: company} = await this.supabase
                                              .from('companies')
                                              .select('name')
                                              .eq('id', id)
                                              .single()                                                 
                                              return company;
}
}
