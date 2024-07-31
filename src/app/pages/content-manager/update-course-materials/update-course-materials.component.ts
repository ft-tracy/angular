// update-course-materials.component.ts

import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ActivatedRoute } from '@angular/router';
import { CourseContentService } from '../../../services/course-content/course-content.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

interface VideoContent {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  videoPreview: string;
  videoId: string;
}

interface ReadingContent {
  readingTitle: string;
  readingContent: string;
  readingId: string;
}

interface QuizQuestion {
  questionText: string;
  choices: string[];
  correctAnswers: string[];
}

interface QuizContent {
  questions: QuizQuestion[];
  quizId: string;
}

interface ModuleContents {
  videos: VideoContent[];
  readingMaterials: ReadingContent[];
  quizzes: QuizContent[];
}

@Component({
  selector: 'app-update-course-materials',
  templateUrl: './update-course-materials.component.html',
  styleUrls: ['./update-course-materials.component.scss'],
  providers: [MessageService]
})
export class UpdateCourseMaterialsComponent implements OnInit, AfterViewInit {
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

  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private courseContentService: CourseContentService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
    this.contentForm = this.fb.group({
      contentList: this.fb.array([])
    });
  }

  get contentList(): FormArray {
    return this.contentForm.get('contentList') as FormArray;
  }

  get contentControls() {
    return this.contentList.controls;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseTitle = params['courseTitle'] || 'Unknown Course';
      this.ModuleName = params['module'] || 'Unknown Module';
      const moduleId = params['moduleId'];
      this.loading = true;
      if (moduleId) {
        this.loadModuleContents(moduleId);
        this.loading = false;
      } else {
        console.error('Module ID is not provided in the route.');
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.videoContainers.changes.subscribe(() => this.scrollToLastAdded());
    this.readingContentContainers.changes.subscribe(() => this.scrollToLastAdded());
    this.quizContainers.changes.subscribe(() => this.scrollToLastAdded());
  }

  loadModuleContents(moduleId: string) {
    this.courseContentService.getModuleContents(moduleId).subscribe(
      (contents: ModuleContents) => {
        console.log(contents);
        // Add videos
        contents.videos.forEach(video => {
          video.videoPreview = video.videoUrl; 
          this.displayVideo(video, moduleId, video.videoId);
        });
        // Add reading materials
        contents.readingMaterials.forEach(readingMaterial => {
          this.displayReadingContent(readingMaterial, moduleId, readingMaterial.readingId);
        });
        // Add quizzes
        contents.quizzes.forEach(quiz => {
          this.displayQuiz(quiz, moduleId, quiz.quizId);
        });
      },
      error => {
        console.error('Error fetching module contents:', error);
      }
    );
  }

  displayVideo(content?: any, moduleId?:string, videoId?:string) {
    console.log('Displaying video:', content);
    const videoGroup = this.fb.group({
      type: 'video',
      moduleId:[moduleId || ''],
      videoId: [videoId || ''],
      videoTitle: [content?.videoTitle || '', Validators.required],
      videoDescription: [content?.videoDescription || '', Validators.required],
      videoUrl: [content?.videoUrl || '', Validators.required],
      newVideoFile: [null]
    });
    this.contentList.push(videoGroup);
    this.cd.detectChanges();
    this.isVideoAdded = !!content;
  }

  onVideoSelect(event: any, index: number) {
    const file = event.files[0];
    const videoGroup = this.contentList.at(index) as FormGroup;
    
    videoGroup.patchValue({ newVideoFile: file });

    
    const reader = new FileReader();
    reader.onload = () => {
      this.videoPreview = reader.result;
      videoGroup.patchValue({ videoUrl: this.videoPreview });
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
    const videoGroup = this.contentList.at(index) as FormGroup;
    const moduleId = videoGroup.get('moduleId')?.value;
    const videoId = videoGroup.get('videoId')?.value;
    this.courseContentService.deleteVideo(moduleId, videoId). subscribe (() => {
      this.videoPreview = null;
      this.contentList.removeAt(index);
      if (this.videoUpload) {
        this.videoUpload.clear();
      }
      this.isVideoAdded = false;
    });

  }

  replaceVideo(_index: number) {
    this.videoUpload.choose();
  }

  displayReadingContent(content?: any, moduleId?: string, readingId?: string) {
    console.log('Displaying reading content:', content);
    const readingGroup = this.fb.group({
      type: 'reading',
      moduleId: [moduleId || ''],
      readingId: [readingId || ''],
      readingTitle: [content?.readingTitle || '', Validators.required],
      readingContent: [content?.readingContent || '', Validators.required]
    });
    this.contentList.push(readingGroup);
    this.cd.detectChanges();
  }

  removeReadingContent(index: number) {
    const readingGroup = this.contentList.at(index) as FormGroup;
    const moduleId = readingGroup.get('moduleId')?.value;
    const readingId = readingGroup.get('readingId')?.value;
    this.courseContentService.deleteReading(moduleId, readingId).subscribe(() => {
    this.contentList.removeAt(index);
    });
  }

  displayQuiz(content?: any, moduleId?: string, quizId?: string) {
    console.log('Displaying quiz:', content);
    const quizGroup = this.fb.group({
      type: 'quiz',
      moduleId: [moduleId || ''],
      quizId: [quizId || ''],
      questions: this.fb.array(content?.questions.map((question: any) => this.createQuestion(question)) || [])
    });
    this.contentList.push(quizGroup);
    this.cd.detectChanges();
  }  
  createQuestion(question: any) {
    return this.fb.group({
      questionText: [question.questionText || '', Validators.required],
      choices: this.fb.array(question.choices.map((choice: any) => this.createChoice(choice, question.correctAnswers)) || [])
    });
  }
  
  createChoice(choice: any, correctAnswers: string[]) {
    return this.fb.group({
      Choice: [choice || '', Validators.required],
      isCorrect: [correctAnswers.includes(choice)]
    });
  }
  

  getQuestions(index: number): FormArray {
    return this.contentList.at(index).get('questions') as FormArray;
  }
  
  getChoices(quizIndex: number, questionIndex: number): FormArray {
    return this.getQuestions(quizIndex).at(questionIndex).get('choices') as FormArray;
  }
  
  addQuizChoice(quizIndex: number, questionIndex: number) {
    this.getChoices(quizIndex, questionIndex).push(this.createChoice({}, []));
  }
  
  removeChoice(quizIndex: number, questionIndex: number, choiceIndex: number) {
    this.getChoices(quizIndex, questionIndex).removeAt(choiceIndex);
  }
  

  removeQuiz(index: number) {
    const quizGroup = this.contentList.at(index) as FormGroup;
    const moduleId = quizGroup.get('moduleId')?.value;
    const quizId = quizGroup.get('quizId')?.value;
    this.courseContentService.deleteQuiz(moduleId, quizId).subscribe(() => {
      this.contentList.removeAt(index);
    });
  }

  scrollToLastAdded() {
    if (this.contentContainer) {
      const element = this.contentContainer.nativeElement as HTMLElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contentList.controls, event.previousIndex, event.currentIndex);
  }

  saveChanges() {
    const updatedContents = this.contentForm.value.contentList;
  
    updatedContents.forEach((content: any) => {
      if (content.type === 'video') {
        this.updateVideoContent(content);
      } else if (content.type === 'reading') {
        this.updateReadingContent(content);
      } else if (content.type === 'quiz') {
        this.updateQuizContent(content);
      }
      // this.ngOnInit();
      // this.router.navigate(['/course-list']);
    });
  }


  updateVideoContent(videoContent: any) {
    const formData = new FormData();
    formData.append('videoTitle', videoContent.videoTitle);
    formData.append('videoDescription', videoContent.videoDescription);
    // formData.append('newVideoFile', videoContent.newVideoFile);
  
     // Ensure newVideoFile is not null before appending
    if (videoContent.newVideoFile) {
      formData.append('newVideoFile', videoContent.newVideoFile);
        } else {
            console.error('newVideoFile is null or undefined');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No video file selected for upload' });
            return;
  }
    this.courseContentService.updateVideo(videoContent.moduleId, videoContent.videoId, formData)
      .subscribe(
        _response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Video content updated successfully' });
        },
        error => {
          console.error('Error updating video content:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update video content' });
        }
      );
  }
  
  updateReadingContent(readingContent: any) {
    this.courseContentService.updateReading(readingContent.moduleId, readingContent.readingId, readingContent)
      .subscribe(
        _response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reading content updated successfully' });
        },
        error => {
          console.error('Error updating reading content:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update reading content' });
        }
      );
  }
  

  updateQuizContent(quizContent: any) {

    // if (!quizContent.quizId || quizContent.quizId.trim() === '') {
    //   console.error('Quiz ID is missing or empty');
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Quiz ID is required' });
    //   return;
    // }

    // Ensure the quizId is included in the payload
    const updatedQuiz = {
      moduleId: quizContent.moduleId,
      quizId: quizContent.quizId, // Include the quizId
      questions: quizContent.questions.map((question: any) => ({
        questionText: question.questionText,
        choices: question.choices.map((choice: any) => choice.Choice),
        correctAnswers: question.choices
          .filter((choice: any) => choice.isCorrect)
          .map((choice: any) => choice.Choice)
      }))
    };
  
    // Send the updated quiz content to the backend
    this.courseContentService.updateQuiz(quizContent.moduleId, updatedQuiz.quizId, updatedQuiz)
      .subscribe(
        _response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Quiz content updated successfully' });
        },
        error => {
          console.error('Error updating quiz content:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update quiz content' });
        }
      );
  }
  

}

