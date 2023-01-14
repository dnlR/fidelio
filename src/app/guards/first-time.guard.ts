import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
//import { Preferences } from '@capacitor/preferences';
import { FirstTimeService } from '../services/first-time.service';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeGuard implements CanActivate {
  constructor(private router: Router, private firstTimeService: FirstTimeService) { }

  async canActivate() {
    const itsFirstTime = await this.firstTimeService.itsFirstTimeForCurrentUser();
    
    if (itsFirstTime) {
      return true;
    } else {
      this.router.navigateByUrl('/user', { replaceUrl: true });
      return false;
    }
  }
}
