//app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContentManagerComponent } from './pages/content-manager/content-manager.component';
import { authGuard } from './guards/auth.guard';
import { CreateCourseComponent } from './pages/content-manager/create-course/create-course.component';
import { CourseListComponent } from './pages/content-manager/course-list/course-list.component';
import { AddCourseMaterialsComponent } from './pages/content-manager/add-course-materials/add-course-materials/add-course-materials.component';
import { ViewUsersComponent } from './pages/admin/user-management/view-users/view-users.component';
import { AddUserComponent } from './pages/admin/user-management/add-user/add-user.component';
import { UpdateUserComponent } from './pages/admin/user-management/update-user/update-user.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { CmSidebarComponent } from './pages/content-manager/cm-sidebar/cm-sidebar.component';




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
    canActivate: [authGuard],
    
  },
 
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'view-users',
    component: ViewUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'update-user',
    component: UpdateUserComponent,
    canActivate: [authGuard],
  },

  {
    path: 'cm-sidebar',
    component: CmSidebarComponent,
  },
  {
    path: 'content-manager/create-course',
    component: CreateCourseComponent,
  },
  {
    path: 'content-manager/course-list',
    component: CourseListComponent,
  },
  {
    path: 'content-manager/course-content',
    component: AddCourseMaterialsComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
