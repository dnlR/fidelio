import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private supabase: AuthService, private router: Router) {
    this.supabase.authChanges((_, session) => {
      console.log(session)
      if (session?.user) {
        this.router.navigate(['/home'])
      }
    })
  }
}