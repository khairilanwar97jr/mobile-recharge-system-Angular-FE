import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  private rewardsApiUrl = 'http://localhost:8080/api/rewards';
  private loyaltyApiUrl = 'http://localhost:8080/api/loyalty';

  constructor(private http: HttpClient) {}

  getPoints(userId: number): Observable<any> {
    return this.http.get(`${this.loyaltyApiUrl}/points/${userId}`);
  }

  getRewards(): Observable<any> {
    return this.http.get(`${this.rewardsApiUrl}`);
  }

  redeemReward(rewardId: number): Observable<any> {
    return this.http.post(`${this.rewardsApiUrl}/redeem`, { rewardId });
  }
}
