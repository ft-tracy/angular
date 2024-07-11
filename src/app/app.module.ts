// app.module.ts

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//admin dashboard
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { CreateCourseComponent } from './pages/content-manager/create-course/create-course.component';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';


import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';

import {  CourseListComponent } from './pages/content-manager/course-list/course-list.component';
import { AddCourseMaterialsComponent } from './pages/content-manager/add-course-materials/add-course-materials/add-course-materials.component';

import { MessageService } from 'primeng/api';
import { CreateQuizComponent } from './pages/content-manager/create-quiz/create-quiz.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ViewUsersComponent } from './pages/admin/user-management/view-users/view-users.component';
import { AddUserComponent } from './pages/admin/user-management/add-user/add-user.component';
import { UpdateUserComponent } from './pages/admin/user-management/update-user/update-user.component';
import { UserService } from './services/user-management/user.service';
import { CmSidebarComponent } from './pages/content-manager/cm-sidebar/cm-sidebar.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CmDashboardComponent } from './pages/content-manager/cm-dashboard/cm-dashboard.component';
import { JwtInterceptor } from './jwt.interceptor';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    ResetPasswordComponent,
    SidebarComponent,
    
    CreateCourseComponent,
    CourseListComponent,
    AddCourseMaterialsComponent,
    CreateQuizComponent,
    ViewUsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    CmSidebarComponent,
    AdminDashboardComponent,
    CmDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
   CardModule,
   HttpClientModule,

   MenuModule, 
   BadgeModule, 
   RippleModule, 
 
   InputTextModule,
   ButtonModule,
   RadioButtonModule,

   EditorModule,
   FileUploadModule,

   DragDropModule,

   ConfirmPopupModule,
   BrowserAnimationsModule,
   ToastModule,
   DialogModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    MessageService,
    UserService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
