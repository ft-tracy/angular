import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { EditorModule } from 'primeng/editor';


@Component({
    selector: 'app-add-course-materials',
    templateUrl: './add-course-materials.component.html',
    styleUrls: ['./add-course-materials.component.scss']
  
})
export class AddCourseContentComponent {
    contentForm!: FormGroup;

  contentList: { type: string, value: any }[] = [];


  constructor(private fb: FormBuilder) {
    this.contentForm = this.fb.group({
    content: this.fb.array([])
    });
  }

  addContent(type: string) {
    this.contentList.push({ type, value: null });
  }

  handleFileUpload(event: any, index: number) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.contentList[index].value = e.target.result;
    };
    reader.readAsDataURL(file);
  }


  saveCourse() {
    if (this.contentForm.valid) {
      const formData = { ...this.contentForm.value, contentList: this.contentList };
      // Send formData to the backend
      console.log('Form Data:', formData);
    }

}

}


























































































// //add-course-materials.component.ts code file
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { CourseMaterialsService } from '../../../services/course-materials/course-materials.service';

// @Component({
//   selector: 'app-add-course-materials',
//   templateUrl: './add-course-materials.component.html',
//   styleUrls: ['./add-course-materials.component.scss']
// })
// export class AddCourseContentComponent implements OnInit {
//   addCourseMaterialsForm!: FormGroup; // Definite assignment assertion
//   courseId!: string;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private courseMaterialsService: CourseMaterialsService
//   ) {}

//   ngOnInit(): void {
//     this.courseId = this.route.snapshot.paramMap.get('courseId')!;
//     this.addCourseMaterialsForm = this.fb.group({
//       materials: this.fb.array([])
//     });
//   }

//   get materials(): FormArray {
//     return this.addCourseMaterialsForm.get('materials') as FormArray;
//   }

//   addMaterials(type: string): void {
//     const materialGroup = this.fb.group({
//       type: [type, Validators.required],
//       content: ['', Validators.required]
//     });

//     if (type === 'quiz') {
//       materialGroup.removeControl('content'); // Remove 'content' control for quiz
//       materialGroup.addControl('question', this.fb.control('', Validators.required));
//       materialGroup.addControl('options', this.fb.array([this.createOption()]));
//       materialGroup.addControl('correctAnswer', this.fb.control('', Validators.required));
//     }

//     (this.materials as FormArray).push(materialGroup);
//     // this.materials.push(materialGroup);
//   }

//   createOption(): FormGroup {
//     return this.fb.group({
//       option: ['', Validators.required]
//     });
//   }

//   addOption(materialIndex: number): void {
//     const options = this.materials.at(materialIndex).get('options') as FormArray;
//     options.push(this.createOption());
//   }

//   removeOption(materialIndex: number, optionIndex: number): void {
//     const options = this.materials.at(materialIndex).get('options') as FormArray;
//     options.removeAt(optionIndex);
//   }

//   onSubmit(): void {
//     if (this.addCourseMaterialsForm.valid) {
//       this.courseMaterialsService.addCourseMaterials(this.courseId, this.addCourseMaterialsForm.value).subscribe(response => {
//         console.log('Materials added successfully', response);
//       });
//     }
//   }
// }

