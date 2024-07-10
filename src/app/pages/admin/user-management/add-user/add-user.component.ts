// // add-user.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-management/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Role: ['', Validators.required]
    });
  }

  addUser(): void {
    const userData = new FormData();
    userData.append('FirstName', this.addUserForm.value.FirstName);
    userData.append('LastName', this.addUserForm.value.LastName);
    userData.append('Role', this.addUserForm.value.Role);
    userData.append('Email', this.addUserForm.value.Email);

    this.userService.addUser(userData).subscribe(response => {
      console.log('User added successfully', response);
      this.router.navigate(['view-users']); // Replace with your desired route
    });
  }
}
