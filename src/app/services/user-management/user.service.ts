// user.service.ts 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


 @Injectable({
  providedIn: 'root'  
})
export class UserService {
  private baseUrl= 'https://orientproservice-1.onrender.com'; 
  
  
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": "6024"})
    return this.http.get<any[]>(`${this.baseUrl}/api/Admin/GetAllUsers`, {headers:headers});
  }

  addUser(userData: FormData): Observable<any> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": ""})
    return this.http.post(`${this.baseUrl}/api/Admin/AddUser`, userData, {headers:headers});
  } 

  updateUser(documentId: string, user: any): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.put<any>(`${this.baseUrl}/api/Admin/UpdateUser/${documentId}`, user, { headers });
  }

  deleteUser(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/Admin/DeleteUser/${documentId}`);
  }

  getUserID(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  getUserProgress(documentId: string) : Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": "ERR_NGROK_6024"});
    return this.http.get<any>(`${this.baseUrl}/api/Progress/userCourseProgress/${documentId}`, {headers});
  }

}
