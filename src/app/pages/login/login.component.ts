// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email || '';
      const password = this.loginForm.value.password || '';

      
    this.authService.login(email, password, "/api/Account/Login").subscribe(response => {
        if (response) {
          if(this.authService.isFirstLogin()){
            sessionStorage.setItem("isFirstLogin", "true")
            this.router.navigate(['/reset-password']);
          } else {
            const role = response.role;
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Login successful'});
            if (role === 'Admin') {
              this.router.navigate(['/admin-dashboard']);
            } else if (role === 'ContentManager') {
              this.router.navigate(['/cm-dashboard']);
            }
          }
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid email or password'});
          console.log("Login error");
        }
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error during login, please try again'});
        console.error("Login error:", error);
      });
    }
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}


