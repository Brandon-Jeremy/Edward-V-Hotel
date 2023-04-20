import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  user = {
    rewards: 100
  };
  rewardsMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  redeemGiftPoints(): void {
    // Implement the logic to redeem gift points
  }

  toggleRewardsMenu() {
    this.rewardsMenuOpen = !this.rewardsMenuOpen;
  }

  displayRewards() {
    // Display rewards-related functionality
  }

  openRewardsCatalogue() {
    // Open rewards catalogue-related functionality
  }

  useRewards() {
    // Use rewards-related functionality
  }

  giftPoints() {
    // Gift points-related functionality
  }

 
}