//add-course-materials.component.spec.ts


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourseMaterialsComponent } from './add-course-materials.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCourseMaterialsComponent', () => {
  let component: AddCourseMaterialsComponent;
  let fixture: ComponentFixture<AddCourseMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCourseMaterialsComponent],
      imports: [ReactiveFormsModule, FileUploadModule, EditorModule, BrowserAnimationsModule],
      providers: [MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCourseMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

