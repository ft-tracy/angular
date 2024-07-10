// view-user.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-management/user.service';
import { User } from '../../../../services/user-management/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  users: any[] = []; 
  DocumentId: any;

  displayDeleteDialog: boolean = false;
  deleteUser: User | null = null;
  confirmDeleteForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
    ) {
      this.confirmDeleteForm = this.fb.group({
        confirmDeleteText: ['', Validators.required]
      });
    }

  ngOnInit() : void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
    (data) => {
      this.users = data;
      console.log(data);
    }, (error) => {
      console.error('Error loading users: ', error);
    }
    );
  }

  navigateToAddUser(): void {
    this.router.navigate(['/add-user']);
  }


    updateUser(user: any): void {
      this.router.navigate(['/update-user'], {
        queryParams: {
          documentId: user.documentId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    }

   
  

  confirmDeleteUser(user: User) {
    this.deleteUser = user;
    this.displayDeleteDialog = true;
  }

  deleteUserConfirmed() {
    if (this.deleteUser) {
      this.userService.deleteUser(this.deleteUser.documentId).subscribe(() => {
        this.getUsers();
        this.displayDeleteDialog = false;
        this.deleteUser = null;
        this.confirmDeleteForm.reset();
      });
    }
  }

  cancelDelete() {
    this.displayDeleteDialog = false;
    this.deleteUser = null;
    this.confirmDeleteForm.reset();
  }
}

