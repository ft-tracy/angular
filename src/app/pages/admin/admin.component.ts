import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}


// import { Component, ViewChild } from '@angular/core';
// import { SidebarModule } from 'primeng/sidebar';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';
// import { AvatarModule } from 'primeng/avatar';
// import { StyleClassModule } from 'primeng/styleclass';
// import { Sidebar } from 'primeng/sidebar';

// @Component({
//     selector: 'sidebar-headless-demo',
//     templateUrl: './sidebar-headless-demo.html',
//     standalone: true,
//     imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule]
// })
// export class SidebarHeadlessDemo {
//     @ViewChild('sidebarRef') sidebarRef!: Sidebar;

//     closeCallback(e): void {
//         this.sidebarRef.close(e);
//     }

//     sidebarVisible: boolean = false;
// }