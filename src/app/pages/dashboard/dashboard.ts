import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recharge } from '../../core/services/recharge';
import { LoyaltyService } from '../../core/services/loyalty.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  points = 0;
  recentHistory: any[] = [];
  userId = 5;

  constructor(
    private loyaltyService: LoyaltyService,
    private rechargeService: Recharge
  ) {}

  ngOnInit() {
    this.loadPoints();
    this.loadRecentHistory();
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

  loadRecentHistory() {
    this.rechargeService.getHistory(this.userId).subscribe({
      next: (response) => {
        this.recentHistory = Array.isArray(response) ? response.slice(0, 5) : [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
