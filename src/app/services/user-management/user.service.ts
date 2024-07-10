// user.service.ts 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


 @Injectable({
  providedIn: 'root'  
})
export class UserService {
  private getUserUrl = 'https://e68c-41-90-101-26.ngrok-free.app'; 
  private addUserUrl = 'https://e68c-41-90-101-26.ngrok-free.app'; 
  private updateUserUrl = 'https://e68c-41-90-101-26.ngrok-free.app'; 
  private deleteUserUrl = 'https://e68c-41-90-101-26.ngrok-free.app';
  private getUserIDUrl = 'https://e68c-41-90-101-26.ngrok-free.app'; 

  
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": "6024"})
    return this.http.get<any[]>(`${this.getUserUrl}/api/Admin/GetAllUsers`, {headers:headers});
  }

  addUser(userData: FormData): Observable<any> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": ""})
    return this.http.post(`${this.addUserUrl}/api/Admin/AddUser`, userData, {headers:headers});
  } 

  updateUser(documentId: string, user: any): Observable<any> {
    const headers = new HttpHeaders({"ngrok-skip-browser-warning": ""});
    return this.http.put<any>(`${this.updateUserUrl}/api/Admin/UpdateUser/${documentId}`, user, { headers });
  }

  deleteUser(id: string): Observable<void> {``
    return this.http.delete<void>(`${this.deleteUserUrl}/api/Admin/DeleteUser/{id}`);
  }

  getUserID(id: string): Observable<any> {
    return this.http.get<any>(`${this.getUserIDUrl}/users/${id}`);
  }
}
