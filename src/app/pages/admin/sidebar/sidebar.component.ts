// sidebar.component.ts 


import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {

  submenuVisible: boolean= false;
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  navigateToAdminDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  navigateToViewUsers(): void {
    this.router.navigate(['/view-users']);
  }

  navigateToCourseList(): void {
    this.router.navigate(['/course-list']);
  }

  navigateToTrackProgress() : void {
    this.router.navigate(['/track-progress']);
  }

  showSubmenu(): void {
    console.log('showSubmenu() called');
    this.submenuVisible = true;
    this.cdr.detectChanges();
  }

  hideSubmenu(): void {
    console.log('hideSubmenu() called');
    this.submenuVisible = false;
    this.cdr.detectChanges();
  }
  
  logout(): void {
    console.log('Logout function called');
    this.authService.logout();
    this.cdr.markForCheck();
  }

  items:MenuItem[] | undefined;

  ngOnInit() {
    this.items= [
      //orientpro Logo
      {
        separator: true
      },

      {
        //dashboard
        label: 'Dashboard',
        icon : 'pi pi-clipboard'
      },
      
      {
        label : 'User Management',
        items : [{
          label : 'Add New User',
          icon : 'pi pi-plus'
        },
        {
          label :' View Existing Users',
          icon : 'pi pi-eye'
          

        },
        {
          label : 'Update User Information',
          icon : 'pi pi-user-edit'
          //
        },
        {
          label : 'Remove User',
          icon : 'pi pi-user-minus'
          //
        },
        {
          label : 'Recover Accounts',
          icon : 'pi pi-database'
          //
        },
       ]
      },
      {label : 'Progress Tracking',
       items : [{
         label : 'Trainee progress',
         icon : 'pi pi-eye'
       },
       {
         label :'Guest Trainee Progress',
         icon : 'pi pi-eye'
      
       },
    
      ]
      },
      {
        label : 'Courses',
        items: [{
          label: 'Existing Courses',
          icon: 'pi pi-book'
        },
      ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
      ]
    },
    {
      separator: true
    }

    // admin avatar profile
    ];

  }

}
