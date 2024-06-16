//course-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private createCourseUrl = 'https://cf47-41-90-101-26.ngrok-free.app';

  constructor(private http : HttpClient){}

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.createCourseUrl}/api/Courses/CreateCourse`, courseData);
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any>(`${this.createCourseUrl}/api/Courses/GetCourses`)
  }    

}
