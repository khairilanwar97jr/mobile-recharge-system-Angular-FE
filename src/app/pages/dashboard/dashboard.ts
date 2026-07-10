import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recharge } from '../../core/services/recharge';
import { LoyaltyService } from '../../core/services/loyalty.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  points = 0;
  recentHistory: any[] = [];
  userId: number | null = null;

  constructor(
    private loyaltyService: LoyaltyService,
    private rechargeService: Recharge,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.loadPoints();
    this.loadRecentHistory();
  }

  private normalizeList(response: any): any[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.content)) {
      return response.content;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.history)) {
      return response.history;
    }

    return [];
  }

  loadPoints() {
    if (this.userId === null) {
      console.log('User not logged in, cannot load points');
      return;
    }

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
    if (this.userId === null) {
      console.log('User not logged in, cannot load history');
      return;
    }

    this.rechargeService.getHistory(this.userId).subscribe({
      next: (response) => {
        this.recentHistory = this.normalizeList(response).slice(0, 5);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
