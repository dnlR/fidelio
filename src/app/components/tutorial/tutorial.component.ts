import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstTimeService } from 'src/app/services/first-time.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  constructor (
    private router: Router,
    private firstTimeService: FirstTimeService,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.toolbarService.sendShowToolbar(false);
  }

  async finish() {
    this.firstTimeService.updateDoneTutorialForCurrentUser();
    this.router.navigate(['/user']);
  }
}
