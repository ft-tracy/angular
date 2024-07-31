import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificUserProgressComponent } from './specific-user-progress.component';

describe('SpecificUserProgressComponent', () => {
  let component: SpecificUserProgressComponent;
  let fixture: ComponentFixture<SpecificUserProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificUserProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificUserProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
