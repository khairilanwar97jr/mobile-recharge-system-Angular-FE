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

  saveUserId(userId: number | string | null | undefined): void {
    if (userId === null || userId === undefined || userId === '') {
      return;
    }

    const parsedId = Number(userId);
    localStorage.setItem('userId', Number.isFinite(parsedId) ? String(parsedId) : String(userId));
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  getUserId(): number | null {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      const parsed = Number(storedId);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      const candidateKeys = ['userId', 'id', 'user_id', 'sub', 'nameid'];

      for (const key of candidateKeys) {
        const value = decoded[key];
        if (value !== undefined && value !== null && value !== '') {
          const parsed = Number(value);
          if (Number.isFinite(parsed)) {
            return parsed;
          }
        }
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
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
    localStorage.removeItem('userId');

  }


  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }

}