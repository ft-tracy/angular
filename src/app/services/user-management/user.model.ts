// user.model.ts

export interface User {

documentId: string;
FirstName: string;
LastName: string;
Email: string;
Role: 'Admin' | 'ContentManager' | 'Trainee' | 'GuestTrainee';
  }
  