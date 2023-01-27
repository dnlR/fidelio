import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;
  toolbarSubscription: Subscription;
  title = 'FIDELIO';
  showToolbar = true;

  constructor(
    private messageService: MessageService,
    private toolbarService: ToolbarService
  ) {
    this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message.title) {
        this.title = message.title;
      } else {
        this.title = 'FIDELIO';
      }
    });
    this.toolbarSubscription = this.toolbarService.onMessage().subscribe(message => {
      if (message.showToolbar) {
        this.showToolbar = true;
      } else {
        this.showToolbar = false;
      }
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    console.log(`AFTER VIEW INIT`);
  }

  ionViewWillEnter() {
    console.log(`VIEW WILL ENTER`);

  }
  ionViewDidEnter() {
    console.log(`VIEW DID ENTER`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
