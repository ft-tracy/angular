//course-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private baseUrl = 'https://orientproservice-1.onrender.com';
  

  constructor(private http: HttpClient) {}

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Courses/CreateCourse`, courseData);
  }
  
  getCourses(): Observable<any[]> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": "69420"})

    return this.http.get<any[]>(`${this.baseUrl}/Courses/GetCourses`, {headers:headers});
  }

  deleteCourse(id: string): Observable <void> {
    return this.http.delete<void>(`${this.baseUrl}/Courses/DeleteCourse/${id}`);
  }


  // updateCourse(id: string, courseData: FormData): Observable<any> {
  //   const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.put<any>(`${this.baseUrl}/Courses/EditCourse/${id}`, courseData, {headers});
  // }

  updateCourse(id: string, courseData: FormData): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.put<any>(`${this.baseUrl}/Courses/EditCourse/${id}`, courseData, { headers });
  }
  
  editModule(module: any): Observable<any> {
    const formData = new FormData();
    formData.append('moduleId', module.moduleId);
    formData.append('title', module.moduleName);  // Change moduleName to title as expected by the backend
  
    return this.http.put(`${this.baseUrl}/api/Modules/EditExistingModule/${module.moduleId}`, formData);
  }
  
  

  deleteModule(moduleId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Modules/DeleteModule/${moduleId}`);
  }

  addModule(module: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Modules/AddNewModule/${module.courseId}`,  { courseId: module.courseId, title: module.title });
  }

}

