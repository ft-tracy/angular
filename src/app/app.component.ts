import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  hideSidebar: boolean= false;

  title = 'orientPro';

  constructor ( public router:Router){}

  ngOnInit(): void {
    
  }

   hideSidebarRoutes = [
    '/login'
  ]

  
}
