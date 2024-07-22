//app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
// import { AuthGuard } from './guards/auth.guard';
import { CreateCourseComponent } from './pages/content-manager/create-course/create-course.component';
import { CourseListComponent } from './pages/content-manager/course-list/course-list.component';
import { AddCourseMaterialsComponent } from './pages/content-manager/add-course-materials/add-course-materials/add-course-materials.component';
import { ViewUsersComponent } from './pages/admin/user-management/view-users/view-users.component';
import { AddUserComponent } from './pages/admin/user-management/add-user/add-user.component';
import { UpdateUserComponent } from './pages/admin/user-management/update-user/update-user.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { CmSidebarComponent } from './pages/content-manager/cm-sidebar/cm-sidebar.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CmDashboardComponent } from './pages/content-manager/cm-dashboard/cm-dashboard.component';
import { UpdateCourseDataComponent } from './pages/content-manager/course-data-management/update-course-data/update-course-data.component';



const routes: Routes = [
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'view-users',
    component: ViewUsersComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'update-user',
    component: UpdateUserComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'cm-dashboard',
    component: CmDashboardComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'cm-sidebar',
    component: CmSidebarComponent,
  },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    // canActivate: [AuthGuard],

  },
  {
    path: 'update-course-data',
    component: UpdateCourseDataComponent,
    // canActivate: [AuthGuard],

  },
  {
    path: 'course-list',
    component: CourseListComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'course-content',
    component: AddCourseMaterialsComponent,
    // canActivate: [AuthGuard],
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
