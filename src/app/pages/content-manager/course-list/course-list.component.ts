// course-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseDataService } from '../../../services/course-data/course-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers:  [ConfirmationService, MessageService],
})
export class CourseListComponent implements OnInit {

  courses: any[] = []; // Define and initialize the courses property
  displayDeleteCourseDialog : boolean = false;
  deleteCourse: any;
  confirmDeleteCourseForm!: FormGroup;

  modules: any;
  deleteModule: any;
  displayDeleteModuleDialog: boolean = false;
  confirmDeleteModuleForm! : FormGroup;

  loading: boolean = true;

  @ViewChild('confirmPopup') confirmPopup!: ConfirmPopup;


  constructor (
    private courseDataService: CourseDataService, 
    private router: Router, 
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.confirmDeleteCourseForm = this.fb.group({
      confirmDeleteCourseText: ['', Validators.required]
    });

    this.confirmDeleteModuleForm = this.fb.group({
      confirmDeleteModuleText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }


  loadCourses(): void {
    this.loading = true;
    this.courseDataService.getCourses().subscribe(
      (data) => {

        this.courses = data.map(course => ({
          ...course,
          modules: course.modules // ensure modules is an array with module objects
        }));
        console.log(this.courses);
        this.loading = false;
      },
      (error) => {
        console.error('Error loading courses: ', error);
        this.loading = false;
      }
    );
  }
  

  createNewCourse(): void {
    this.router.navigate(['/create-course']);
  }

  updateCourseData(course: any): void {
    this.router.navigate(['/update-course-data'], {
      queryParams: {
        id: course.id,
        courseImage: course.courseImageUrl,
        courseTitle: course.courseTitle,
        courseDescription: course.courseDescription,
        courseTags: course.courseTags.join(','), // Ensure tags are joined as a string
        courseModules: JSON.stringify(course.modules.map((module: any) => ({
          moduleId: module.moduleId,
          moduleName: module.moduleName
        }))),
        exclusiveToCompanyEmployees: course.exclusiveToCompanyEmployees
      }
    });
  }
  

  confirmDeleteCourse(course: any): void {
    this.deleteCourse = course;
    this.confirmDeleteCourseForm.reset();
    this.displayDeleteCourseDialog = true;
  }

  deleteCourseConfirmed(): void {
    if (this.confirmDeleteCourseForm.get('confirmDeleteCourseText')?. value === this.deleteCourse.courseTitle) {
      this.courseDataService.deleteCourse(this.deleteCourse.id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Course Deleted', detail: 'Course has been successfully deleted.' });
        this.loadCourses();
        this.displayDeleteCourseDialog = false;
      }, _error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Course could not be deleted.'});
      });
    }
  }


  cancelDeleteCourse(): void {
    this.displayDeleteCourseDialog = false;
  }


  goToAddCourseMaterials(courseTitle: string, module: string): void {
    this.router.navigate(['/course-content'], {
      queryParams: {
        courseTitle: courseTitle,
        module: module,
      }
    });
  }

  goToUpdateCourseMaterials(courseTitle: string, module: string, moduleId: string): void {
    this.router.navigate(['/update-content'], {
      queryParams: {
        courseTitle: courseTitle,
        module: module,
        moduleId: moduleId,
      }
    });
  }


  confirmDeleteModule(module: any): void {
    this.deleteModule = module;
    this.confirmDeleteModuleForm.reset();
    this.displayDeleteModuleDialog = true;
  }



  deleteModuleConfirmed(): void {
    if (
      this.confirmDeleteModuleForm.get('confirmDeleteModuleText')?.value ===
      this.deleteModule?.moduleName
    ) {
      this.courseDataService.deleteModule(this.deleteModule.moduleId).subscribe(
        () => {
          this.loadCourses();
          this.displayDeleteModuleDialog = false;
        },
        (error) => {
          console.error('Error deleting module: ', error);
        }
      );
    }
  }

  cancelDeleteModule(): void {
    this.displayDeleteModuleDialog = false;
  }
}


