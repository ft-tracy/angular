//  update-user.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user-management/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  documentId!: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.updateUserForm = this.fb.group({
      documentId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.documentId = params['documentId'];
      this.updateUserForm.patchValue({
        documentId: params['documentId'],
        firstName: params['firstName'],
        lastName: params['lastName'],
        email: params['email'],
        role: params['role']
      });
    });
  }



  saveChanges(): void {
    console.log('saveChanges method called'); // Added log
      this.updateUserForm.valid && this.documentId
     {
      console.log('Form is valid and userId is present');
      const userData = this.updateUserForm.value;
      this.userService.updateUser(this.documentId, userData).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.router.navigate(['/view-users']);
        },
        (error) => {
          console.error('Error updating user: ', error);
        }
      );
  }
  
}}
