import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  createCourseForm!: FormGroup;
  courseImagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      CourseImage: [null, Validators.required],
      CourseTitle: ['', Validators.required],
      CourseDescription: ['', Validators.required],
      CourseTags: this.fb.array([]),
      CourseModules: this.fb.array([]),
      CreatedOn: [new Date(), Validators.required],
      ExclusiveToCompanyEmployees: [false]
    });
  }

  get CourseTags(): FormArray {
    return this.createCourseForm.get('CourseTags') as FormArray;
  }

  get CourseModules(): FormArray {
    return this.createCourseForm.get('CourseModules') as FormArray;
  }

  addTag(tag: string): void {
    this.CourseTags.push(this.fb.control(tag));
  }

  addModule(module: string): void {
    this.CourseModules.push(this.fb.control(module));
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.createCourseForm.patchValue({
      CourseImage: file
    });

    const reader = new FileReader();
    reader.onload = () => {
      this.courseImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.createCourseForm.valid) {
      console.log(this.createCourseForm.value);
    }
  }
}




