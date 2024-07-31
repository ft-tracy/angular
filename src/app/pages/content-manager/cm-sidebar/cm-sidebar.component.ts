// cm-sidebar.component.ts

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cm-sidebar',
  templateUrl: './cm-sidebar.component.html',
  styleUrl: './cm-sidebar.component.scss'
})

export class CmSidebarComponent implements OnInit
{
  constructor(private router: Router) {}

  navigateToCourseList(): void {
    this.router.navigate(['/course-list']);
  }

  navigateToTrackProgress() : void {
    this.router.navigate(['/track-progress']);
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
        label : 'Courses',
        items : [{
          label : 'View Existing Courses',
          icon : 'pi pi-book'
        },
       ]
      },
      {
       label : 'Progress Tracking',
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

