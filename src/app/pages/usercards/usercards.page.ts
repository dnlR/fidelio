import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserCardsService } from 'src/app/services/user-cards.service';

@Component({
  selector: 'app-usercards',
  templateUrl: './usercards.page.html',
  styleUrls: ['./usercards.page.scss'],
})
export class UsercardsPage implements OnInit {

  userCards!: any[];

  constructor(
    private authService: AuthService,
    private userCardsService: UserCardsService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUserCardsForCurrentUser();
  }

  async getUserCardsForCurrentUser() {
    const currentUserId = await this.authService.getCurrentUserId();
    const userCards = await this.userCardsService.getUserCardsForUser(currentUserId);

    // console.log(`USER CARDS: ${JSON.stringify(userCards, null, 4)}`);
    this.userCards = userCards;
  }

  async leaveCampaign(userCardId) {
    const currentUserId = await this.authService.getCurrentUserId();
    this.userCardsService.userLeavesCampaign(currentUserId, userCardId);
    await this.getUserCardsForCurrentUser();  
  }
}
