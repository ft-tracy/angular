// view-user.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-management/user.service';
import { User } from '../../../../services/user-management/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ViewUsersComponent implements OnInit {
  users: any[] = []; 
  displayDeleteDialog: boolean = false;
  deleteUser: any;
  confirmDeleteForm: FormGroup;

  @ViewChild('confirmPopup') confirmPopup!: ConfirmPopup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
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

   
  confirmDeleteUser(user: any) : void{
    this.deleteUser = user;
    this.confirmDeleteForm.reset();
    this.displayDeleteDialog = true;
  }


  // deleteUserConfirmed(): void {
  //   if (this.confirmDeleteForm.get('confirmDeleteText')?.value === `${this.deleteUser.firstName} ${this.deleteUser.lastName}`) {
  //     this.userService.deleteUser(this.deleteUser.documentId).subscribe(() => {
  //       this.getUsers();
  //       this.displayDeleteDialog = false;
  //     });
  //   }
  // }

  deleteUserConfirmed(): void {
    if (this.confirmDeleteForm.get('confirmDeleteText')?.value === `${this.deleteUser.firstName} ${this.deleteUser.lastName}`) {
      this.userService.deleteUser(this.deleteUser.documentId).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'User Deleted', detail: 'User has been successfully deleted.' });
        this.getUsers();
        this.displayDeleteDialog = false;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be deleted.' });
      });
    }
  }

  cancelDelete(): void {
    this.displayDeleteDialog = false;
  }
}

