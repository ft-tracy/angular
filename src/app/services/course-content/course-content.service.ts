//course-content.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  private videoUrl = 'https://7120-41-90-101-26.ngrok-free.app';
  private readingUrl = 'https://7120-41-90-101-26.ngrok-free.app';
  private quizUrl = 'https://7120-41-90-101-26.ngrok-free.app';

  constructor(private http: HttpClient) { }

  saveVideoContent(videoData: FormData): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.post(`${this.videoUrl}/Content/AddVideo`, videoData, { headers });
  }

  saveReadingContent(readingData: FormData): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.post(`${this.readingUrl}/Content/AddReadingMaterial`, readingData, { headers });
  }

  saveQuizContent(quizData: FormData): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.post(`${this.quizUrl}/Content/AddQuiz`, quizData, { headers });
  }
}
