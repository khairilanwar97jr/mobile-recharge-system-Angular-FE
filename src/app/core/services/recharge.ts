import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Recharge {


  private apiUrl = 'http://localhost:8080/api/recharge';


  constructor(
    private http: HttpClient
  ) {}


getHistory(userId: number): Observable<any> {

  return this.http.get(
    `${this.apiUrl}/history/${userId}`
  );

}


  recharge(data: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data
    );

  }


}