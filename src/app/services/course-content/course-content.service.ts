//course-content.service.ts


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  private baseUrl = 'https://orientproservice-1.onrender.com';

  constructor(private http: HttpClient) { }

  saveVideoContent(videoData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Content/AddVideo`, videoData);
  }

  saveReadingContent(readingData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Content/AddReadingMaterial`, readingData);
  }

  saveQuizContent(quizData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Content/AddQuiz`, quizData);
  }

  getModuleContents(moduleId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/Content/GetModuleContents/${moduleId}`);
  }

  updateModuleContents(contents: any[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Content/UpdateModuleContents`, contents);
  }

  deleteVideo(moduleId: string, videoId: string): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}/Content/DeleteVideo/${moduleId}/${videoId}`);
  }



  updateVideo(moduleId: string, videoId: string, videoContent: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Content/UpdateVideo/${moduleId}/${videoId}`, videoContent);
  }

  deleteReading(moduleId: string, readingId: string): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}/Content/DeleteReadingMaterial/${moduleId}/${readingId}`);
  }

  updateReading(moduleId: string, readingId: string, readingContent: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Content/UpdateReadingMaterial/${moduleId}/${readingId}`, readingContent);
  }

  deleteQuiz(moduleId: string, quizId: string): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}/Content/DeleteQuiz/${moduleId}/${quizId}`);
  }

  updateQuiz(moduleId: string, quizId: string, quizData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Content/UpdateQuiz/${moduleId}/${quizId}`, quizData);
  }
}
