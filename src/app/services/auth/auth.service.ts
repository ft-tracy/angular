// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://9a64-105-163-0-234.ngrok-free.app'; 
  private resetPasswordUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  private sendOtpUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  private verifyOtpUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  
  private role: string | null = null;
  
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string, url: string): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.post<any>(this.loginUrl + url, { email, password }, { headers: headers })
      .pipe(
        tap(response => {
          if (response) {
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
            if (response.isFirstLogin !== undefined) {
              localStorage.setItem('isFirstLogin', response.isFirstLogin.toString());
            }
            if (response.role) {
              localStorage.setItem('role', response.role.toString());
              this.role = response.role;
            }
          }
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(null);
        })
      );
  }

  isFirstLogin(): boolean {
    return localStorage.getItem('isFirstLogin') === 'true';
  }

  resetPassword(email: string, newPassword: string, confirmPassword: string, endpoint: string): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.post<any>(this.resetPasswordUrl + endpoint, { email, newPassword, confirmPassword }, { headers: headers }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.role = response.role;
        }
      }),
      catchError(error => {
        console.error('Reset password error', error);
        return of(null);
      })
    );
  }

  sendOTP(email: string): Observable<any> {
    return this.http.post(`${this.sendOtpUrl}/api/Account/SendOTP`, { email });
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.verifyOtpUrl}/api/Account/VerifyOTP`, { email, otp });
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return this.role;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isFirstLogin');
    this.role = null;
    this.router.navigate(['/landing']);
  }
}
