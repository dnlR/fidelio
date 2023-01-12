import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { FirstTimeService } from '../services/first-time.service';

@Injectable({
  providedIn: 'root'
})
export class ShowTutorialGuard implements CanActivate {
  constructor(private router: Router, private firstTimeService: FirstTimeService) {}

  async canActivate() {
    const doneTutorial = await this.firstTimeService.currentUserHasDoneTutorial();
    
    if (!doneTutorial.done_tutorial) {
      return true;
    } else {
      this.router.navigateByUrl('/user', { replaceUrl: true });
      return false;
    }
  }
}
