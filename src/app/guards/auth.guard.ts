// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const isFirstLogin = this.authService.isFirstLogin();
      const role = this.authService.getUserRole();
      
      if (isFirstLogin) {
        this.router.navigate(['/reset-password']);
        return false;
      }
      
      
      if (role === 'Admin') {
        this.router.navigate(['/admin-dashboard' ]);
        return false;
      }

      if (role === 'ContentManager') {
        this.router.navigate(['/cm-dashboard' ]);
        return false;
      }
      return true;
    } 
    else 
    {
      this.router.navigate(['/landing']);
      return false;
    }
    }
  }



