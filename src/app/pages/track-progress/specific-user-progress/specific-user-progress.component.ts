// specific-user-progress.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-management/user.service';

@Component({
  selector: 'app-specific-user-progress',
  templateUrl: './specific-user-progress.component.html',
  styleUrls: ['./specific-user-progress.component.scss']
})
export class SpecificUserProgressComponent implements OnInit {
  documentId: string | null = null;
  userProgress: any;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParamMap.subscribe(params => {
      this.documentId = params.get('documentId');
      if (this.documentId) {
        this.getUserProgress(this.documentId);
      }
    });
  }

  getUserProgress(documentId: string): void {
    this.loading = true;
    this.userService.getUserProgress(documentId).subscribe(
      progress => {
        this.userProgress = progress;
        this.loading = false;
      },
      error => {
        console.error('Error fetching user progress:', error);
        this.loading = false;
      }
    );
  }

  getCompletedModules(completedContents: any): { moduleName: string, contents: string[] }[] {
    return Object.keys(completedContents).map(moduleName => ({
      moduleName,
      contents: completedContents[moduleName]
    }));
  }
}

