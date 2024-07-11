//course-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private createCourseUrl = 'https://7120-41-90-101-26.ngrok-free.app';
  private getCourseUrl = 'https://7120-41-90-101-26.ngrok-free.app';

  constructor(private http: HttpClient) {}

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.createCourseUrl}/Courses/CreateCourse`, courseData);
  }
  
  getCourses(): Observable<any[]> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": "69420"})

    return this.http.get<any[]>(`${this.getCourseUrl}/Courses/GetCourses`, {headers:headers});
  }

  

}

