import { NgModule } from '@angular/core';
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
import { InputTextModule } from 'primeng/inputtext';
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
import { AvatarModule } from 'primeng/avatar';
import { CreateCourseComponent } from './pages/content-manager/create-course/create-course/create-course.component';
// import { CourseListComponent } from './pages/content-manager/course-list/course-list.component';
// import { ContentfulService } from './services/contentful/contentful.service';


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
    // CourseListComponent,
    // AppLayoutComponent,
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
   AvatarModule

  ],
  // providers: [ContentfulService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
