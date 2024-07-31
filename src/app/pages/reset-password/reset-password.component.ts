// reset-password.component.ts

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../directives/password-match.directive';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPasswordForm = this.fb.group({
    Email : [ '', [Validators.required, Validators.email]],
    NewPassword: ['', [Validators.required]],
    ConfirmPassword: ['', Validators.required]
  },
   {
    validators: passwordMatchValidator
  } 
);

  constructor (
    private fb : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private messageService: MessageService,

  ) {}
  get Email (){
    return this.resetPasswordForm.controls['Email'];
  }
  get NewPassword (){
    return this.resetPasswordForm.controls['NewPassword'];
  }
  get ConfirmPassword (){
    return this.resetPasswordForm.controls['ConfirmPassword'];
  }

  onSubmit(): void{
    if (this.resetPasswordForm.valid){
      const email = this.resetPasswordForm.value.Email || '';
      const NewPassword = this.resetPasswordForm.value.NewPassword || '';
      const ConfirmPassword = this.resetPasswordForm.value.ConfirmPassword || '';
    
      this.authService.resetPassword(email, NewPassword, ConfirmPassword, "/api/Account/ResetPassword").subscribe(response => {
        
          if (response.message === "Password reset successful."){
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Password reset successful'});
            this.router.navigate(['/login']);
          }else {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Reset Password error'});
            console.log("Reset Password error");
          }
        }, error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Reset Password error'});
          console.error("Reset Password error:", error);
        });
      }
    }
}
