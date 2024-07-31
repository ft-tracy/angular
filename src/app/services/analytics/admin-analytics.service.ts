// admin-analytics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAnalyticsService {
  private baseUrl = 'https://orientproservice-1.onrender.com/'; // Replace with your actual base URL

  constructor(private http: HttpClient) {}

  getUserRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Progress/trackUserRoles`);
  }

  getQuizScoreDistribution(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Progress/trackQuizScoreDistribution`);
  }

  getCourseRatings(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Progress/courseRatingAverage/${courseId}`);
  }

  getCourseProgress(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Progress/userCourseProgress/${userId}`);
  }
}
