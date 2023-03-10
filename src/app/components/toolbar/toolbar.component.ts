import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  userEmail: string = '';

  constructor(
    private messageService: MessageService,
    private toolbarService: ToolbarService,
    private authService: AuthService,
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
    });
  }

  ngOnInit() {
    
  }

  async loadUserEmail() {
    const user = await (await this.authService.getUser());
    if (user) {
      this.userEmail = user.email;
    }
    // console.log(`USER EMAIL: ${this.userEmail}`);
  }

  async ngAfterViewInit() {
    console.log(`AFTER VIEW INIT`);
    this.authService.currentUser.subscribe(async (user) => {
      if (user) {
        await this.loadUserEmail();
      }
    });
    await this.loadUserEmail();
  }

  async ionViewWillEnter() {
    console.log(`VIEW WILL ENTER`);
  }

  ionViewDidEnter() {
    console.log(`VIEW DID ENTER`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
