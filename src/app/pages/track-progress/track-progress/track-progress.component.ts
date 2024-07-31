// track-progress.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../services/user-management/user.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

interface User {
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  enrolledCourses: string[];
  courseProgress: { [courseId: string]: CourseProgress };
}

interface CourseProgress {
  hasStarted: boolean;
  isCompleted: boolean;
  progress: number;
  completedContents: string[];
}

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.scss']
})
export class TrackProgressComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filterControl = new FormControl('ALL');

  loading: boolean = true;

  constructor(
    private userService: UserService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.filterControl.valueChanges.subscribe(value => {
      this.applyFilter(value || 'ALL');
    });
  }

  goToSpecificUserProgress(documentId: string) : void {
    this.router.navigate(['/user-progress'], {queryParams: {documentId: documentId}});
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.loading = false;
      this.applyFilter(this.filterControl.value || 'ALL');
    });
  }

 

  applyFilter(filter: string): void {
    if (filter === 'ALL') {
      this.filteredUsers = this.users.filter(user => 
        user.role !== 'Admin' && user.role !== 'ContentManager'
      );
    } else if (filter === 'TRAINEES') {
      this.filteredUsers = this.users.filter(user => user.role === 'Trainee');
    } else if (filter === 'GUEST_TRAINEES') {
      this.filteredUsers = this.users.filter(user => user.role === 'Guest');
    }
  }
}
