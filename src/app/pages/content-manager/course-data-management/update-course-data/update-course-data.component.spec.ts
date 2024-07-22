import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseDataComponent } from './update-course-data.component';

describe('UpdateCourseDataComponent', () => {
  let component: UpdateCourseDataComponent;
  let fixture: ComponentFixture<UpdateCourseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCourseDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCourseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
