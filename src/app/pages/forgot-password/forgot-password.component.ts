// forgot-password.component.ts

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    otp: ['']
  });
  
  otpSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  get email() {
    return this.forgotPasswordForm.controls['email'];
  }

  get otp() {
    return this.forgotPasswordForm.controls['otp'];
  }

  requestOTP(): void {
    if (this.email.valid) {
      const email = this.email.value || '';
      this.authService.sendOTP(email).subscribe(
        response => {
          this.otpSent = true;
          this.messageService.add({severity:'success', summary: 'Success', detail: 'OTP sent successfully'});
          console.log('OTP sent successfully.');
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error sending OTP'});
          console.error('Error sending OTP:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.email.value || '';
      const otp = this.otp.value || '';
      this.authService.verifyOTP(email, otp).subscribe(
        response => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Correct OTP entered, proceed with password reset'});
          this.router.navigate(['/reset-password']);
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Incorrect OTP'});
          console.error('Error verifying OTP:', error);
        }
      );
    }
  }
}

