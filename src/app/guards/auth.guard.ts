// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const isFirstLogin = this.authService.isFirstLogin();
      const role = this.authService.getUserRole();
      
      if (state.url === '/reset-password' && !isFirstLogin) {
        this.router.navigate(['/reset-password']);
        return false;
      }
      
      if (!isFirstLogin && state.url === '/reset-password') {
        this.router.navigate([`/${role === 'Admin' ? 'admin' : 'content-manager'}`]);
        return false;
      }
      
      if (state.url.startsWith('/admin') && role !== 'Admin') {
        this.router.navigate([`/${role === 'Admin' ? 'admin' : 'content-manager'}`]);
        return false;
      }

      if (state.url.startsWith('/content-manager') && role !== 'ContentManager') {
        this.router.navigate([`/${role === 'Admin' ? 'admin' : 'content-manager'}`]);
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



