// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminAnalyticsService } from '../../../services/analytics/admin-analytics.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userRolesData: any;
  quizScoreDistributionData: any;
  courseRatingData: any;
  courseProgressData: any;

  constructor(private adminAnalyticsService: AdminAnalyticsService) {}

  ngOnInit(): void {
    this.loadUserRolesData();
    this.loadQuizScoreDistributionData();
    this.loadCourseRatingData();
    this.loadCourseProgressData();
  }

  loadUserRolesData(): void {
    this.adminAnalyticsService.getUserRoles().subscribe(data => {
      this.userRolesData = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6600']
          }
        ]
      };
    });
  }

  loadQuizScoreDistributionData(): void {
    this.adminAnalyticsService.getQuizScoreDistribution().subscribe(data => {
      this.quizScoreDistributionData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Number of Trainees',
            data: Object.values(data),
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#FF6600']
          }
        ]
      };
    });
  }

  loadCourseRatingData(): void {
    // Example courseId to fetch the ratings
    const exampleCourseId = 'example-course-id';
    this.adminAnalyticsService.getCourseRatings(exampleCourseId).subscribe(data => {
      this.courseRatingData = data;
    });
  }

  loadCourseProgressData(): void {
    // Example userId to fetch the course progress
    const exampleUserId = 'example-user-id';
    this.adminAnalyticsService.getCourseProgress(exampleUserId).subscribe(data => {
      this.courseProgressData = data;
    });
  }
}
