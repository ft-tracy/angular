import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import "primeicons/primeicons.css";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  createCourseForm!: FormGroup;
  courseImagePreview: string | ArrayBuffer | null = null;

  private readonly COURSE_IMAGE = 'CourseImage';
  private readonly COURSE_TITLE = 'CourseTitle';
  private readonly COURSE_DESCRIPTION = 'CourseDescription';
  private readonly COURSE_TAGS = 'CourseTags';
  private readonly COURSE_MODULES = 'CourseModules';
  private readonly CREATED_ON = 'CreatedOn';
  private readonly EXCLUSIVE_TO_COMPANY_EMPLOYEES = 'ExclusiveToCompanyEmployees';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      [this.COURSE_IMAGE]: [null, Validators.required],
      [this.COURSE_TITLE]: ['', Validators.required],
      [this.COURSE_DESCRIPTION]: ['', Validators.required],
      [this.COURSE_TAGS]: this.fb.array([]),
      [this.COURSE_MODULES]: this.fb.array([]),
      [this.CREATED_ON]: [new Date(), Validators.required],
      [this.EXCLUSIVE_TO_COMPANY_EMPLOYEES]: ['', Validators.required]
    });
  }

  get CourseTags(): FormArray {
    return this.createCourseForm.get(this.COURSE_TAGS) as FormArray;
  }

  get CourseModules(): FormArray {
    return this.createCourseForm.get(this.COURSE_MODULES) as FormArray;
  }

  addTag(tag: string = ''): void {
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
    if (this.createCourseForm.valid) {
      console.log(this.createCourseForm.value);
    }
  }
}




