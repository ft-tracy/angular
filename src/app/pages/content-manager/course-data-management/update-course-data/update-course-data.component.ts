//  update-course-data.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDataService } from '../../../../services/course-data/course-data.service';

@Component({
  selector: 'app-update-course-data',
  templateUrl: './update-course-data.component.html',
  styleUrls: ['./update-course-data.component.scss']
})
export class UpdateCourseDataComponent implements OnInit {

  updateCourseForm: FormGroup;
  courseImagePreview: string | ArrayBuffer | null = null;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseDataService: CourseDataService
  ) {
    this.updateCourseForm = this.fb.group({
      id: [''],
      courseImage: [null, Validators.required],
      courseTitle: ['', Validators.required],
      courseDescription: ['', [Validators.required, Validators.maxLength(500)]],
      courseTags: this.fb.array([]),
      courseModules: this.fb.array([]),
      exclusiveToCompanyEmployees: [false, Validators.required]
    });

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      const courseTags = params['courseTags'] ? params['courseTags'].split(',') : [];
      const courseModules = params['courseModules'] ? JSON.parse(params['courseModules']) : [];

      this.updateCourseForm.patchValue({
        id: params['id'],
        courseImage: params['courseImage'],
        courseTitle: params['courseTitle'],
        courseDescription: params['courseDescription'],
        exclusiveToCompanyEmployees: params['exclusiveToCompanyEmployees'] === 'true',
      });

      // Set form array values
      this.setFormArrayValues(courseTags, this.courseTags, 'tag');
      this.setFormArrayValues(courseModules, this.courseModules, 'moduleName', 'moduleId', 'moduleName');

      this.courseImagePreview = params['courseImage']; // Set preview image
    });
  }

  setFormArrayValues(values: any[], formArray: FormArray, controlName: string, idName?: string, nameName?: string) {
    formArray.clear();

    values.forEach(value => {
      const group = this.fb.group({
        [controlName]: [nameName ? value[nameName] : value, Validators.required]
      });
      if (idName) {
        group.addControl(idName, this.fb.control(value[idName]));
      }
      formArray.push(group);
    });
  }
  

  get courseTags(): FormArray {
    return this.updateCourseForm.get('courseTags') as FormArray;
  }

  get courseModules(): FormArray {
    return this.updateCourseForm.get('courseModules') as FormArray;
  }


  addTag(tag: any): void {
    const group = this.fb.group({
      tag: [tag, Validators.required]
    });
    
    this.courseTags.push(group);
  }

  removeTag(index: number): void {
    this.courseTags.removeAt(index);
  }

  
  // addModule(module: any): void {
  //   const group = this.fb.group({
  //     moduleName: [module, Validators.required]
  //   });
  //   this.courseModules.push(group);
  // }

  addModule(moduleName: string): void {
    const group = this.fb.group({
      moduleName: [moduleName, Validators.required],
      moduleId: ['']
    });
    this.courseModules.push(group);
  }

  

  

  removeModule(index: number): void {
    this.courseModules.removeAt(index);
  }
  // editModule(index: number, moduleName: string): void {
  //   const moduleId = this.courseModules.at(index).get('moduleId')?.value; // Assuming module IDs are stored in the form
  //   const updatedModule = {  moduleId, moduleName };
    
  //   this.courseDataService.editModule(updatedModule).subscribe(
  //     (response: any) => {
  //       console.log('Module updated successfully', response);
  //       this.courseModules.at(index).patchValue({  moduleName });
  //     },
  //     (error: any) => {
  //       console.error('Error updating module: ', error);
  //     }
  //   );
  // }
  
  editModule(index: number, moduleName: string): void {
    const moduleId = this.courseModules.at(index).get('moduleId')?.value;
    const updatedModule = { moduleId, title: moduleName };

    if (moduleId) {
      // Update existing module
      this.courseDataService.editModule(updatedModule).subscribe(
        (response: any) => {
          console.log('Module updated successfully', response);
          this.courseModules.at(index).patchValue({ moduleName });
        },
        (error: any) => {
          console.error('Error updating module: ', error);
        }
      );
    } else {
      console.log('addModule () called');
      // Add new module
      this.courseDataService.addModule({ courseId: this.id, title: moduleName }).subscribe(
        (response: any) => {
          console.log('Module added successfully', response);
          this.courseModules.at(index).patchValue({ moduleId: response.moduleId });
        },
        (error: any) => {
          console.error('Error adding module: ', error);
        }
      );
    }
  }
  
  

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.courseImagePreview = e.target.result;
        this.updateCourseForm.patchValue({ courseImage: file });
      };
      reader.readAsDataURL(file);
    }
  }


  saveChanges(): void {
    console.log("saveChanges() called");
    if (this.updateCourseForm.valid && this.id) {
    const courseData = this.updateCourseForm.value;
    const formData = new FormData();

    formData.append('courseTitle', courseData.courseTitle);
    formData.append('courseDescription', courseData.courseDescription);
    formData.append('exclusiveToCompanyEmployees', courseData.exclusiveToCompanyEmployees.toString());

    
    // Append the image file if it's present
    if (courseData.courseImage) {
      formData.append('courseImage', courseData.courseImage);
    }

      // Append tags
      courseData.courseTags.forEach((tagGroup: any) => {
        formData.append('courseTags', tagGroup.tag);
      });

      // Append modules
      courseData.courseModules.forEach((moduleGroup: any) => {
        formData.append('courseModules', moduleGroup.module);
      });
    
  
  this.courseDataService.updateCourse(this.id, formData).subscribe(
        response => {
          console.log('Course updated successfully', response);
          this.router.navigate(['/course-list']);
        },
        error => {
          console.error('Error updating course: ', error);
        }
      );
    }
  }

  
}

