//add-course-materials.component.ts

import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ActivatedRoute } from '@angular/router';
import { CourseContentService } from '../../../../services/course-content/course-content.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-course-materials',
  templateUrl: './add-course-materials.component.html',
  styleUrls: ['./add-course-materials.component.scss'],
  providers: [MessageService]
})
export class AddCourseMaterialsComponent implements OnInit, AfterViewInit {
  @ViewChild('videoUpload') videoUpload!: FileUpload;
  @ViewChildren('videoContainer') videoContainers!: QueryList<ElementRef>;
  @ViewChildren('readingContentContainer') readingContentContainers!: QueryList<ElementRef>;
  @ViewChildren('quizContainer') quizContainers!: QueryList<ElementRef>;
  @ViewChild('contentContainer') contentContainer!: ElementRef;

  contentForm!: FormGroup;

  public videoTitle: string = '';
  public videoDescription: string = '';
  public videoPreview: string | ArrayBuffer | null = null;
  public uploadProgress: number = 0;

  public readingTitle: string = '';
  public readingContent: string = '';

  public courseTitle: string = '';
  public ModuleName: string = '';

  public isVideoAdded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private courseContentService: CourseContentService,
    private cd: ChangeDetectorRef
  ) {
    this.contentForm = this.fb.group({
      contentList: this.fb.array([])
    });
  }

  get contentList(): FormArray {
    return this.contentForm.get('contentList') as FormArray;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseTitle = params['courseTitle'] || 'Unknown Course';
      this.ModuleName = params['module'] || 'Unknown Module';
    });
  }

  ngAfterViewInit(): void {
    this.videoContainers.changes.subscribe(() => this.scrollToLastAdded());
    this.readingContentContainers.changes.subscribe(() => this.scrollToLastAdded());
    this.quizContainers.changes.subscribe(() => this.scrollToLastAdded());
  }

  addVideo() {
    const videoGroup = this.fb.group({
      type: 'video',
      videoTitle: ['', Validators.required],
      videoDescription: ['', Validators.required],
      VideoFile: [null, Validators.required]
    });
    this.contentList.push(videoGroup);
    this.cd.detectChanges();
    this.isVideoAdded = true;
  }

  onVideoSelect(event: any, index: number) {
    const file = event.files[0];
    const videoGroup = this.contentList.at(index) as FormGroup;
    videoGroup.patchValue({ VideoFile: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.videoPreview = reader.result;
    };
    reader.readAsDataURL(file);

    this.uploadProgress = 0;
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  }

  onVideoRemove(index: number) {
    this.contentList.at(index).get('VideoFile')?.reset();
    this.videoPreview = null;
  }

  removeVideo(index: number) {
    this.videoPreview = null;
    this.contentList.removeAt(index);
    if (this.videoUpload) {
      this.videoUpload.clear();
    }
    this.isVideoAdded = false;
  }

  addReadingContent() {
    const readingGroup = this.fb.group({
      type: 'reading',
      readingTitle: ['', Validators.required],
      readingContent: ['', Validators.required]
    });
    this.contentList.push(readingGroup);
    this.cd.detectChanges();
  }

  removeReadingContent(index: number) {
    this.contentList.removeAt(index);
  }

  addQuiz() {
    const quizGroup = this.fb.group({
      type: 'quiz',
      QuestionText: ['', Validators.required],
      Choices: this.fb.array([this.createChoice(), this.createChoice()]),
    });
    this.contentList.push(quizGroup);
    this.cd.detectChanges();
  }

  createChoice(): FormGroup {
    return this.fb.group({
      Choice: ['', Validators.required],
      isCorrect: [false, Validators.required]
    });
  }

  addQuizChoice(quizIndex: number) {
    const quiz = this.contentList.at(quizIndex).get('Choices') as FormArray;
    quiz.push(this.createChoice());
  }

  getChoices(quizIndex: number): FormArray {
    return this.contentList.at(quizIndex).get('Choices') as FormArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contentList.controls, event.previousIndex, event.currentIndex);
  }

  scrollToLastAdded() {
    setTimeout(() => {
      if (this.contentContainer) {
        this.contentContainer.nativeElement.scrollTop = this.contentContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  removeQuiz(index: number) {
    this.contentList.removeAt(index);
  }

  removeChoice(quizIndex: number, choiceIndex: number) {
    const quiz = this.contentList.at(quizIndex).get('Choices') as FormArray;
    quiz.removeAt(choiceIndex);
  }

  getFormControl(index: number, controlName: string): AbstractControl | null {
    return (this.contentList.at(index) as FormGroup).get(controlName);
  }


    saveChanges() {
    for (let i = 0; i < this.contentList.length; i++) {
      const content = this.contentList.at(i).value;
      if (content.type === 'video') {
        this.uploadVideoContent(this.ModuleName, content.videoTitle, content.videoDescription, content.VideoFile);
      } else if (content.type === 'reading') {
        this.uploadReadingContent(this.ModuleName, content.readingTitle, content.readingContent);
      } else if (content.type === 'quiz') {
        this.uploadQuizContent(this.ModuleName, content.QuestionText, content.Choices);
      }
    }
  }

  private uploadVideoContent(ModuleName: string, videoTitle: string, videoDescription: string, VideoFile: File) {
        const videoData = new FormData();
        videoData.append('ModuleName', ModuleName);
        videoData.append('videoTitle', videoTitle);
        videoData.append('videoDescription', videoDescription);
        videoData.append('VideoFile', VideoFile);
    
        this.courseContentService.saveVideoContent(videoData).subscribe();
      }
    
      private uploadReadingContent(ModuleName: string, readingTitle: string, readingContent: string) {
        const readingData = new FormData();
        readingData.append('ModuleName', ModuleName);
        readingData.append('readingTitle', readingTitle);
        readingData.append('readingContent', readingContent);
    
        this.courseContentService.saveReadingContent(readingData).subscribe();
      }
    
     
    
      private uploadQuizContent(ModuleName: string, QuestionText: string, Choices: any[]) {
        const formattedChoices = Choices.map(choice => {
          return {[ choice.Choice]: choice.isCorrect};
        })
    
    
        const quizData = new FormData();
        quizData.append('ModuleName', ModuleName);
        quizData.append('Questions', JSON.stringify([{
          questionText: QuestionText,
          choices: formattedChoices
        }]));


 // Log FormData contents
 for (let pair of (quizData as any).entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}

  this.courseContentService.saveQuizContent(quizData).subscribe(response => {
    console.log('Response from backend:', response);
  }, error => {
    console.error('Error from backend:', error);
  });
        console.log('Sending quiz data:', quizData);
    
        this.courseContentService.saveQuizContent(quizData).subscribe();
      }
  
}
