import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseMaterialsComponent } from './update-course-materials.component';

describe('UpdateCourseMaterialsComponent', () => {
  let component: UpdateCourseMaterialsComponent;
  let fixture: ComponentFixture<UpdateCourseMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCourseMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCourseMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
