//app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
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
import { TrackProgressComponent } from './pages/track-progress/track-progress/track-progress.component';
import { UpdateCourseMaterialsComponent } from './pages/content-manager/update-course-materials/update-course-materials.component';
import { SpecificUserProgressComponent } from './pages/track-progress/specific-user-progress/specific-user-progress.component';
import { BreadcrumbComponent } from './pages/breadcrumb/breadcrumb.component';


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
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'sidebar',
  //   component: SidebarComponent,
  // },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Admin Dashboard' }
    
  },

  {
    path: 'view-users',
    component: ViewUsersComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'User List' }

  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add New User' }

  },
  {
    path: 'update-user',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Update User Details' }

  },

  {
    path: 'cm-dashboard',
    component: CmDashboardComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Content Manager Dashboard' }
    
  },

  // {
  //   path: 'cm-sidebar',
  //   component: CmSidebarComponent,
  // },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Create New Course' }


  },
  {
    path: 'update-course-data',
    component: UpdateCourseDataComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Update Course Details' }


  },
  {
    path: 'course-list',
    component: CourseListComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Course List' }
    
  },
  {
    path: 'course-content',
    component: AddCourseMaterialsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Course Content' }

  },
  {
    path: 'update-content',
    component: UpdateCourseMaterialsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Updats Course Content' }

  },
  {
    path: 'track-progress',
    component: TrackProgressComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Track Progress' }
  },
  {
    path: 'user-progress',
    component: SpecificUserProgressComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Specific User Progress' }

  },

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
