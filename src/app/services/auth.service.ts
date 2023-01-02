import { Injectable } from '@angular/core'
import { LoadingController, ToastController } from '@ionic/angular'
import { AuthChangeEvent, createClient, PostgrestError, Session, SupabaseClient, User, UserResponse } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'

// export interface Profile {
//   username: string
//   website: string
//   avatar_url: string
// }

const tuser= "0f3c866e-ebf3-4e8a-b35b-9d3d29946ee2";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient
  public sp_userID!:string
  public sp_userEmail!:string
  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    this.initsetup();
  }

  async initsetup(){
    const x = await this.user1;
    this.sp_userID = x.data.user.id;
    this.sp_userEmail = x.data.user.email;
    console.log(this.sp_userID + " " + this.sp_userEmail);
  }

  get user() : any {
    //return this.supabase.auth.getUser()
    //const x:any = await this.supabase.auth.getUser;
    //const r = x.data.user.id;
    return this.sp_userID
  }
  get user1() : any {
    return this.supabase.auth.getUser()
  }

  get session() : any {
    return this.supabase.auth.getSession()
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', this.user?.id)
      .single()
  }
    
  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email:string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }


  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 })
    await toast.present()
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

}
