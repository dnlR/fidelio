import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
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
    return await this.supabase.auth.signInWithOtp({
      email: email,
    });
  }

  logout() {
    this.supabase.auth.signOut();
  }

  async getUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    return user;
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
