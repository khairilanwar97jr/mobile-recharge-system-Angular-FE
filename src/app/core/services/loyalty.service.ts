import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  private apiUrl = 'http://localhost:8080/api/loyalty';

  constructor(private http: HttpClient) {}

  getPoints(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/points/${userId}`);
  }

  getRewards(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rewards`);
  }

  redeemReward(userId: number, rewardId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/redeem`, { userId, rewardId });
  }
}
