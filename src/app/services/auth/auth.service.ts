import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://3837-41-90-101-26.ngrok-free.app'; 
  private resetPasswordUrl ='https://3837-41-90-101-26.ngrok-free.app';
  private userRole: string | null = null;

  

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string,url: string): Observable<any> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": ""})
    return this.http.post<any>(this.loginUrl+url, { email, password }, {headers:headers}).pipe(

      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.userRole = response.role; // Save user role for later use
          localStorage.setItem('isFirstLogin', response.isFirstLogin);
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


  // isFirstLogin(): boolean {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.isFirstLogin;
  //   }
  //   return false;
  // }
   
  resetPassword(Email: string, NewPassword: string, ConfirmPassword: string, endpoint:string): Observable<any> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": ""})
    return this.http.post<any>(this.resetPasswordUrl+endpoint, { Email, NewPassword, ConfirmPassword}, {headers:headers}).pipe(
      
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.userRole = response.role; // Save user role for later use
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
    return this.userRole;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isFirstLogin');
    this.userRole = null;
    this.router.navigate(['/landing']);
  }


}