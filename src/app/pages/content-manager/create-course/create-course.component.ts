//create-course.component.ts
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

  private readonly COURSE_IMAGE = 'file';
  private readonly COURSE_TITLE = 'CourseTitle';
  private readonly COURSE_DESCRIPTION = 'CourseDescription';
  public readonly COURSE_TAGS = 'CourseTags';
  public readonly COURSE_MODULES = 'CourseModules';
  // private readonly CREATED_ON = 'CreatedOn';
  private readonly EXCLUSIVE_TO_COMPANY_EMPLOYEES = 'ExclusiveToCompanyEmployees';

  constructor(private fb: FormBuilder, private coursedataService: CourseDataService, private router:Router) {}

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      [this.COURSE_IMAGE]: [null, Validators.required],
      [this.COURSE_TITLE]: ['', Validators.required],
      [this.COURSE_DESCRIPTION]: ['', [Validators.required, Validators.maxLength(500)]],
      [this.COURSE_TAGS]: this.fb.array([]),
      [this.COURSE_MODULES]: this.fb.array([]),
      [this.EXCLUSIVE_TO_COMPANY_EMPLOYEES]: ['', Validators.required]
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

  /**
   * Removes a module from the CourseModules FormArray at the specified index.
   * @param index - The index of the module to be removed.
   */
  removeModule(index: number): void {
      this.CourseModules.removeAt(index);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.createCourseForm.patchValue({ [this.COURSE_IMAGE]: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.courseImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {

    if (this,this.createCourseForm.valid) {
      const formData = new FormData();

      Object.keys(this.createCourseForm.controls).forEach(key => {
        if (key === this.COURSE_TAGS || key === this.COURSE_MODULES) {
          const FormArray= this.createCourseForm.get(key) as FormArray;
          FormArray.controls.forEach((control, index) => {
            formData.append(`${key}[${index}]`, control.value);
          });
        } else {
          formData.append(key, this.createCourseForm.get(key)?.value);
        }
      });

    this.coursedataService.createCourse(formData).subscribe(response => {
      console.log(response);
      this.router.navigate (['/course-list']);
    },error => {
      console.log(error);
    });
  }
}
}