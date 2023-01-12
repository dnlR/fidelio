import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstTimeService } from 'src/app/services/first-time.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  constructor (
    private router: Router,
    private firstTimeService: FirstTimeService
  ) { }

  ngOnInit() {}

  async finish() {
    this.firstTimeService.updateDoneTutorialForCurrentUser();
    this.router.navigate(['/user']);
  }
}
