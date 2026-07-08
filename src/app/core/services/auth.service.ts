import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:8080/api/auth';


  constructor(
    private http: HttpClient
  ) {}


  login(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );

  }


  saveToken(token: string): void {

    localStorage.setItem(
      'token',
      token
    );

  }

  saveUser(user: string): void {
    localStorage.setItem('user', user);
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }


  logout(): void {

    localStorage.removeItem(
      'token'
    );
    localStorage.removeItem('user');

  }


  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }

}