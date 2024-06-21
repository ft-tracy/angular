// course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../../../services/course-data/course-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: any[] = []; // Define and initialize the courses property

  private readonly COURSE_TITLE = 'CourseTitle';
  private readonly COURSE_DESCRIPTION = 'CourseDescription';
  public readonly COURSE_TAGS = 'CourseTags';
  public readonly COURSE_MODULES = 'CourseModules';

  constructor (
    private courseDataService: CourseDataService, 
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseDataService.getCourses().subscribe(
      (data) => {
        this.courses = data; // Assign the data returned from the getCourses() method to courses property
        console.log(data);
      },
      (error) => {
        console.error('Error loading courses: ', error); // Log detailed error information
      }
    );
  }

  createNewCourse(): void {
    this.router.navigate(['/create-course']);
  }

  goToAddCourseMaterials(courseTitle: string, module: string): void {
    this.router.navigate(['/course-content'], {
      queryParams: {
        courseTitle: courseTitle,
        module: module,
      }
    });
  }
}
