import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { isPlatform } from '@ionic/angular';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.init();
  }

  async init() {
    // Manually load user session once on page load
    const { data: { user } } = await this.supabase.auth.getUser();

    if (user) {
      this._currentUser.next(user)
    } else {
      this._currentUser.next(false)
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session!.user)
      } else {
        this._currentUser.next(false)
        this.router.navigateByUrl('/', { replaceUrl: true })
      }
    })
  }

  async signInWithEmail(email: string) {
    if (isPlatform('capacitor')) {
      return await this.supabase.auth.signInWithOtp({
        email: email,
        options: { emailRedirectTo: 'supachat://login' },
      })
    } else {
      return await this.supabase.auth.signInWithOtp({
        email: email,
      });
    }
  }

  async setSession(access_token, refresh_token) {
    return this.supabase.auth.setSession({ access_token, refresh_token });
  }

  logout() {
    this.supabase.auth.signOut();
  }

  async getUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    return user;
  }

  async getCurrentUserId() {
    const currentUserId = (await this.getUser()).id;
    return currentUserId;
  }

  async userIsAuthenticated() {
    const user = await this.getUser();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }
}