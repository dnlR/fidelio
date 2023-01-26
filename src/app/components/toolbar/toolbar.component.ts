import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;
  title = 'Fidelio';

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message) {
        this.title = message.title;
      } else {
        this.title = 'Fidelio';
      }
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    console.log(`AFTER VIEW INIT`);
  }

  ionViewWillEnter() {
    console.log(`VIEW DID ENTER`);

  }
  ionViewDidEnter() {
    console.log(`VIEW DID ENTER`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
