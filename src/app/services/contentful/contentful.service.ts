// import { Injectable } from '@angular/core';
// import { createClient, Entry } from 'contentful';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContentfulService {
//   private client = createClient({
//     space: 'rd4f1g1jn0b2',
//     accessToken: '1cdxpOovhX1rDtzNvLJkjhpWlH2VQ7GdUke-tIqQ57U',
//   });


//   constructor() { }

//   getCourses(){
//     return this.client.getEntries({ content_type: 'course'});
//   }

//   createCourse(courseData: any){
//     return this.client 
//       // .getSpace('rd4f1g1jn0b2')
//       .getSpace()
//       .then ((space) => space.getEnvironment('master'))
//       .then((environment) => 
//       environment.createEntry('course', {
//         fields: courseData,
//       })
//     );
//   }


// }
