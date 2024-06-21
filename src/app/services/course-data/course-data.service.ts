//course-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private createCourseUrl = 'https://f304-41-90-101-26.ngrok-free.app';
  private getCourseUrl = 'https://f304-41-90-101-26.ngrok-free.app';

  constructor(private http: HttpClient) {}

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(`${this.createCourseUrl}/Courses/CreateCourse`, courseData);
  }

  getCourses(): Observable<any[]> {
    var headers = new HttpHeaders({"ngrok-skip-browser-warning": "69420"})
    //https://f304-41-90-101-26.ngrok-free.app/Courses/GetCourses

    return this.http.get<any[]>(`${this.getCourseUrl}/Courses/GetCourses`, {headers:headers});
  }

}



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// // Define an interface for course data
// interface Course {
//   CourseTitle: string;
//   CourseDescription: string;
//   CourseTags: string[];
//   CourseModules: string[];
// }

// // Define an interface for the API response
// interface ApiResponse<T> {
//   data: T;
//   message: string;
//   status: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseDataService {
//   private readonly createCourseUrl = 'https://3837-41-90-101-26.ngrok-free.app/Courses/CreateCourse';
//   private readonly getCourseUrl = 'https://3837-41-90-101-26.ngrok-free.app/Courses/GetCourses';

//   constructor(private readonly http: HttpClient) {}

//   // Method to create a new course
//   createCourse(courseData: FormData): Observable<ApiResponse<any>> {
//     return this.http.post<ApiResponse<any>>(this.createCourseUrl, courseData)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Method to get the list of courses
//   getCourses(): Observable<ApiResponse<Course[]>> {
//     const headers = new HttpHeaders({ "ngrok-skip-browser-warning": "" });
//     return this.http.get<ApiResponse<Course[]>>(this.getCourseUrl, { headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Error handling method
//   private handleError(error: HttpErrorResponse): Observable<never> {
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side or network error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Backend error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// // Define an interface for course data
// interface Course {
//   CourseTitle: string;
//   CourseDescription: string;
//   CourseTags: string[];
//   CourseModules: string[];
// }

// // Define an interface for the API response
// interface ApiResponse<T> {
//   data: T;
//   message: string;
//   status: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseDataService {
//   private readonly createCourseUrl = 'https://ed02-105-163-156-130.ngrok-free.app';
//   private readonly getCourseUrl = 'https://ed02-105-163-156-130.ngrok-free.app';

//   constructor(private readonly http: HttpClient) {}

//   // Method to create a new course
//   createCourse(courseData: FormData): Observable<ApiResponse<any>> {
//     return this.http.post<ApiResponse<any>>(this.createCourseUrl, courseData)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Method to get the list of courses
//   getCourses(): Observable<ApiResponse<Course[]>> {
//     const headers = new HttpHeaders({ "ngrok-skip-browser-warning": "" });
//     return this.http.get<ApiResponse<Course[]>>(this.getCourseUrl, { headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Error handling method
//   private handleError(error: HttpErrorResponse): Observable<never> {
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side or network error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Backend error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// // Define an interface for course data
// interface Course {
//   CourseTitle: string;
//   CourseDescription: string;
//   CourseTags: string[];
//   CourseModules: string[];
// }

// // Define an interface for the API response
// interface ApiResponse<T> {
//   data: T;
//   message: string;
//   status: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseDataService {
//   private readonly createCourseUrl = 'https://ed02-105-163-156-130.ngrok-free.app';
//   private readonly getCourseUrl = 'https://ed02-105-163-156-130.ngrok-free.app';

//   constructor(private readonly http: HttpClient) {}

//   // Method to create a new course
//   createCourse(courseData: FormData): Observable<ApiResponse<any>> {
//     return this.http.post<ApiResponse<any>>(this.createCourseUrl, courseData)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Method to get the list of courses
//   getCourses(): Observable<ApiResponse<Course[]>> {
//     const headers = new HttpHeaders({ "ngrok-skip-browser-warning": "" });
//     return this.http.get(this.getCourseUrl, { headers, responseType: 'text' })
//       .pipe(
//         map(response => {
//           try {
//             const jsonResponse = JSON.parse(response) as ApiResponse<Course[]>;
//             return jsonResponse;
//           } catch (error) {
//             throw new Error('Error parsing response: ');
//           }
//         }),
//         catchError(this.handleError)
//       );
//   }

//   // Error handling method
//   private handleError(error: HttpErrorResponse): Observable<never> {
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side or network error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Backend error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// // Define an interface for course data
// interface Course {
//   CourseTitle: string;
//   CourseDescription: string;
//   CourseTags: string[];
//   CourseModules: string[];
// }

// // Define an interface for the API response
// interface ApiResponse<T> {
//   data: T;
//   message: string;
//   status: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseDataService {
//   private readonly createCourseUrl = 'https://ed02-105-163-156-130.ngrok-free.app';
//   private readonly getCourseUrl = 'https://ed02-105-163-156-130.ngrok-free.app';

//   constructor(private readonly http: HttpClient) {}

//   // Method to create a new course
//   createCourse(courseData: FormData): Observable<ApiResponse<any>> {
//     return this.http.post<ApiResponse<any>>(this.createCourseUrl, courseData)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   /**
//    * Method to get the list of courses.
//    * @returns An Observable of ApiResponse<Course[]> containing the list of courses.
//    */
//   getCourses(): Observable<ApiResponse<Course[]>> {
//     const headers = new HttpHeaders({ "ngrok-skip-browser-warning": "" });

//     return this.http.get(this.getCourseUrl, { headers, responseType: 'text' }).pipe(
//       map((response: string) => {
//         console.log('Raw response:', response); // Log the raw response
//         try {
//           const jsonResponse = JSON.parse(response) as ApiResponse<Course[]>;
//           console.log('Parsed response:', jsonResponse); // Log the parsed response
//           return jsonResponse;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : 'Unknown error parsing response';
//           console.error('Error parsing response:', errorMessage); // Log parsing error
//           throw new Error('Error parsing response: ' + errorMessage);
//         }
//       }),
//       catchError(this.handleError)
//     );
//   }

//   // Error handling method
//   private handleError(error: HttpErrorResponse): Observable<never> {
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side or network error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Backend error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }