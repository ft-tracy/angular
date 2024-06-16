import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { ContentManagerComponent } from './pages/content-manager/content-manager.component';

//admin dashboard
import { SidebarModule } from 'primeng/sidebar';
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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    ResetPasswordComponent,
    AdminComponent,
    ContentManagerComponent,
    SidebarComponent,
    CreateCourseComponent,
    // AppLayoutComponent,

    CourseListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
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


  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
