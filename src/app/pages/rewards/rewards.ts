import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyService } from '../../core/services/loyalty.service';

@Component({
  selector: 'app-rewards',
  imports: [CommonModule],
  templateUrl: './rewards.html',
  styleUrl: './rewards.css'
})
export class Rewards implements OnInit {
  rewards: any[] = [];
  points = 0;
  userId = 5;
  isRedeeming = false;

  constructor(private loyaltyService: LoyaltyService) {}

  ngOnInit() {
    this.loadRewards();
    this.loadPoints();
  }

  loadPoints() {
    this.loyaltyService.getPoints(this.userId).subscribe({
      next: (response) => {
        this.points = response?.points ?? response?.totalPoints ?? 0;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadRewards() {
    this.loyaltyService.getRewards().subscribe({
      next: (response) => {
        this.rewards = Array.isArray(response) ? response : [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  redeemReward(reward: any) {
    if (reward.pointsRequired > this.points) {
      alert('Not enough points');
      return;
    }

    this.isRedeeming = true;

    this.loyaltyService.redeemReward(this.userId, reward.id).subscribe({
      next: () => {
        this.isRedeeming = false;
        this.points -= reward.pointsRequired;
        alert('Reward redeemed successfully');
      },
      error: (err) => {
        this.isRedeeming = false;
        console.log(err);
        alert('Reward redemption failed');
      }
    });
  }
}
