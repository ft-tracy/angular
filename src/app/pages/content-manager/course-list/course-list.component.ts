//course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../../../services/course-data/course-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {
  courses: any[] = []; // Define and initialize the courses property

  constructor (private courseDataService: CourseDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseDataService.getCourses().subscribe(
      (data) => {
        this.courses = data; // Assign the data returned from the getCourses() method to courses property
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading courses: ', error);
      }
    );

 

  }

  createNewCourse(): void {
    this.router.navigate(['/create-course']);
      
    }

}
