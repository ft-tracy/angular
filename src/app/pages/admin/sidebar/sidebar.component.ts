// sidebar.component.ts 
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit

{
  constructor(private router: Router) {}

  navigateToAdminDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  navigateToViewUsers(): void {
    this.router.navigate(['/view-users']);
  }

  navigateToCourseList(): void {
    this.router.navigate(['/course-list']);
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
          //avatar, name, email,set role
        },
        {
          label :' View Existing Users',
          icon : 'pi pi-eye'
          //avatar, name, email, role
          //filter by role
          //search bar

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
         //avatar, name, email,set role
       },
       {
         label :'Guest Trainee Progress',
         icon : 'pi pi-eye'
         //avatar, name, email, role
         //filter by role
         //search bar

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
