
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import "primeicons/primeicons.css";
import { CourseDataService } from '../../../services/course-data/course-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  createCourseForm!: FormGroup;
  courseImagePreview: string | ArrayBuffer | null = null;

  private readonly COURSE_IMAGE = 'CourseImage'
  private readonly COURSE_TITLE = 'CourseTitle';
  private readonly COURSE_DESCRIPTION = 'CourseDescription';
  public readonly COURSE_TAGS = 'CourseTags';
  public readonly COURSE_MODULES = 'CourseModules';
  private readonly EXCLUSIVE_TO_COMPANY_EMPLOYEES = 'ExclusiveToCompanyEmployees';

  constructor(private fb: FormBuilder, private coursedataService: CourseDataService, private router: Router) {}

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      [this.COURSE_IMAGE]: [null, Validators.required],
      [this.COURSE_TITLE]: ['', Validators.required],
      [this.COURSE_DESCRIPTION]: ['', [Validators.required, Validators.maxLength(500)]],
      [this.COURSE_TAGS]: this.fb.array([]),
      [this.COURSE_MODULES]: this.fb.array([]),
      [this.EXCLUSIVE_TO_COMPANY_EMPLOYEES]: [false, Validators.required]
    });
  }

  get CourseTags(): FormArray {
    return this.createCourseForm.get(this.COURSE_TAGS) as FormArray;
  }

  get CourseModules(): FormArray {
    return this.createCourseForm.get(this.COURSE_MODULES) as FormArray;
  }

  addTag(tag: any): void {
    this.CourseTags.push(this.fb.control(tag, Validators.required));
  }

  removeTag(index: number): void {
    this.CourseTags.removeAt(index);
  }

  addModule(module: string = ''): void {
    this.CourseModules.push(this.fb.control(module, Validators.required));
  }

  removeModule(index: number): void {
    this.CourseModules.removeAt(index);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const CourseImage = input.files[0];
      this.createCourseForm.patchValue({ [this.COURSE_IMAGE]: CourseImage });
      const reader = new FileReader();
      reader.onload = () => {
        this.courseImagePreview = reader.result;
      };
      reader.readAsDataURL(CourseImage);
    }
  }

  onSubmit(): void {
    if (this.createCourseForm.valid) {
      const formData = new FormData();

      Object.keys(this.createCourseForm.controls).forEach(key => {
        const control = this.createCourseForm.get(key);
        if (key === this.COURSE_TAGS || key === this.COURSE_MODULES) {
          const formArray = control as FormArray;
          formArray.controls.forEach((arrayControl) => {
            formData.append(key, arrayControl.value);
          });
        } else {
          if (key === this.COURSE_IMAGE) {
            formData.append(key, control?.value, (control?.value as File).name);
          } else if (key === this.EXCLUSIVE_TO_COMPANY_EMPLOYEES) {
            formData.append(key, control?.value.toString()); // Convert boolean to string
          } else {
            formData.append(key, control?.value);
          }
        }
      });

      this.coursedataService.createCourse(formData).subscribe(
        response => {
          console.log('Course created successfully', response);
          this.router.navigate(['/course-list']);
        },
        error => {
          console.error('Error creating course', error);
        }
      );
    }
  }
}
