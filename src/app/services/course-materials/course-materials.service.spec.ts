import { TestBed } from '@angular/core/testing';

import { CourseMaterialsService } from './course-materials.service';

describe('CourseMaterialsService', () => {
  let service: CourseMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
