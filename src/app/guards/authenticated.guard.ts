import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate() {
    const authenticated = await this.authService.userIsAuthenticated();
    
    if (authenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/', { replaceUrl: true });
      return false;
    }
  }
}
