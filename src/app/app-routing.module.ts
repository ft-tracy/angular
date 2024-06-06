import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContentManagerComponent } from './pages/content-manager/content-manager.component';
import { authGuard } from './guards/auth.guard';

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
    // canActivate: [authGuard],
    
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'content-manager',
    component: ContentManagerComponent,
    // canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
