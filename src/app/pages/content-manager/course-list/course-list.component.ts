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
  // modules: any [] =[];
  displayDeleteCourseDialog : boolean = false;
  deleteCourse: any;
  confirmDeleteCourseForm!: FormGroup;

  deleteModule: any;
  displayDeleteModuleDialog: boolean = false;
  confirmDeleteModuleForm! : FormGroup;

  loading: boolean = true;

  @ViewChild('confirmPopup') confirmPopup!: ConfirmPopup;
modules: any;

  // private readonly COURSE_TITLE = 'CourseTitle';
  // private readonly COURSE_DESCRIPTION = 'CourseDescription';
  // public readonly COURSE_TAGS = 'CourseTags';
  // public readonly COURSE_MODULES = 'CourseModules';

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
      confirmDeleteText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  // loadCourses(): void {
  //   this.loading = true;
  //   this.courseDataService.getCourses().subscribe(
  //     (data) => {
  //       this.courses = data; // Assign the data returned from the getCourses() method to courses property
  //       console.log(data);
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error('Error loading courses: ', error); // Log detailed error information
  //       this.loading = false;
  //     }
  //   );
  // }

  loadCourses(): void {
    this.loading = true;
    this.courseDataService.getCourses().subscribe(
      (data) => {
        // Assuming the response structure is correct
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
        courseTags: course.courseTags.join(','), // Join array to string for query parameter
        courseModules: course.courseModules.join(','), // Join array to string for query parameter
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
      }, error => {
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


  confirmDeleteModule(module: any): void {
    this.deleteModule = module;
    this.confirmDeleteModuleForm.reset();
    this.displayDeleteModuleDialog = true;
  }

  // deleteModuleConfirmed(): void {
  //   if (this.confirmDeleteModuleForm.get('confirmDeleteText')?.value === this.deleteModule.name) {
  //     this.courseDataService.deleteModule(this.deleteModule.id).subscribe(
  //       (response: any) => {
  //         console.log('Module deleted successfully', response);
  //         // Find the module index in the FormArray and remove it
  //         const courseIndex = this.courses.findIndex(course => course.courseModules.some((mod: any) => mod.id === this.deleteModule.id));
  //         if (courseIndex > -1) {
  //           const moduleIndex = this.courses[courseIndex].courseModules.findIndex((mod: any) => mod.id === this.deleteModule.id);
  //           if (moduleIndex > -1) {
  //             this.courses[courseIndex].courseModules.splice(moduleIndex, 1);
  //           }
  //         }
  //         this.displayDeleteModuleDialog = false;
  //       },
  //       (error: any) => {
  //         console.error('Error deleting module: ', error);
  //       }
  //     );
  //   }
  // }

  deleteModuleConfirmed(): void {
    if (this.deleteModule) {
      this.courseDataService.deleteModule(this.deleteModule.moduleId).subscribe(() => {
        this.loadCourses(); // Refresh the modules list
        this.displayDeleteModuleDialog = false;
      }, error => {
        console.error('Error deleting module: ', error);
      });
    }
  }

  cancelDeleteModule(): void {
    this.displayDeleteModuleDialog = false;
  }
}


