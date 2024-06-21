//add-course-materials.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-course-materials',
  templateUrl: './add-course-materials.component.html',
  styleUrls: ['./add-course-materials.component.scss'],
  providers: [MessageService]
})
export class AddCourseMaterialsComponent implements OnInit {
  @ViewChild('videoUpload') videoUpload!: FileUpload;
  
  courseForm: FormGroup;
  editorContent: string = '';
  videoPreview: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;

  courseTitle: string = '';
  moduleTitle: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      content: [''],
      video: [null]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseTitle = params['courseTitle'] || 'Unknown Course';
      this.moduleTitle = params['moduleTitle'] || 'Unknown Module';
    });
  }

  saveChanges() {
    if (this.isFormValid()) {
      // Save logic goes here, e.g., sending data to backend
      console.log('Form submitted with:', this.courseForm.value);
    }
  }

  isFormValid(): boolean {
    return this.courseForm.get('content')?.value.trim() !== '' || this.courseForm.get('video')?.value !== null;
  }

  onVideoSelect(event: any) {
    const file = event.files[0];
    this.courseForm.patchValue({ video: file });

    const reader = new FileReader();
    reader.onload = (e) => {
      this.videoPreview = reader.result;
    };
    reader.readAsDataURL(file);

    // Simulate upload progress
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.messageService.add({ severity: 'info', summary: 'Video Uploaded', detail: file.name });
      }
    }, 100);
  }

  onVideoRemove() {
    this.removeVideo();
  }

  removeVideo() {
    this.videoPreview = null;
    this.courseForm.patchValue({ video: null });
    if (this.videoUpload) {
      this.videoUpload.clear();
    }
  }
}
