//course-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private createCourseUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  private getCourseUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  private deleteCourseUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  private updateCourseUrl = 'https://9a64-105-163-0-234.ngrok-free.app';
  

  constructor(private http: HttpClient) {}

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.createCourseUrl}/Courses/CreateCourse`, courseData);
  }
  
  getCourses(): Observable<any[]> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": "69420"})

    return this.http.get<any[]>(`${this.getCourseUrl}/Courses/GetCourses`, {headers:headers});
  }

  deleteCourse(id: string): Observable <void> {
    return this.http.delete<void>(`${this.deleteCourseUrl}/Courses/DeleteCourse/${id}`);
  }


  updateCourse(id: string, courseData: FormData): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.updateCourseUrl}/Courses/EditCourse/${id}`, courseData, {headers});
  }
  
  editModule(module: any) {
    return this.http.put(`/api/Modules/EditExistingModule/${module.moduleId}`, module);
  }

  deleteModule(moduleId: string) {
    return this.http.delete(`/api/Modules/DeleteModule/${moduleId}`);
  }

  addModule(module: any) {
    return this.http.post(`/api/Modules/AddNewModule/${module.courseId}`, module);
  }

}

