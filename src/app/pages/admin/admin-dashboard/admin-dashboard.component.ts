// admin-dashboard.component.ts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  totalEnrolledCourses: number = 100;  // Sample data
  completedCourses: number = 60;       // Sample data
  inProgressCourses: number = 30;      // Sample data
  notStartedCourses: number = 10;      // Sample data
  quizScores: number[] = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];  // Sample data

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  getCompletedCoursesPercentage(): number {
    return (this.completedCourses / this.totalEnrolledCourses) * 100;
  }

  getInProgressCoursesPercentage(): number {
    return (this.inProgressCourses / this.totalEnrolledCourses) * 100;
  }

  getNotStartedCoursesPercentage(): number {
    return (this.notStartedCourses / this.totalEnrolledCourses) * 100;
  }

  initializeChart(): void {
    const ctx = (document.getElementById('quizScoreChart') as HTMLCanvasElement).getContext('2d');

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
  //       datasets: [{
  //         label: 'Number of Trainees',
  //         data: this.quizScores,
  //         backgroundColor: $accent-color,
  //         borderColor: $primary-color,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
}
}

