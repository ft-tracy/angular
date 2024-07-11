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
  private loginUrl = 'https://3c16-41-90-101-26.ngrok-free.app'; 
  private resetPasswordUrl = 'https://3c16-41-90-101-26.ngrok-free.app';
  private role: string | null = null;
  
  

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string,url: string): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""})
    return this.http.post<any>(this.loginUrl+url, { email, password }, {headers:headers}).pipe(

      tap(response => {
        if (response && response.role) {
          this.role = response.role; // Save user role for later use
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
   
  resetPassword(email: string, newPassword: string, confirmPassword: string, endpoint:string): Observable<any> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": ""})
    return this.http.post<any>(this.resetPasswordUrl+endpoint, { email, newPassword, confirmPassword}, {headers:headers}).pipe(
      
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.role = response.role; // Save user role for later use
        }
      }),

      catchError(error => {
        console.error('Reset password error', error);
        return of(null);
      })
    );
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token){
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