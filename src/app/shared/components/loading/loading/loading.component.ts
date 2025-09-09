import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { interval, Subscription } from 'rxjs';
import { LoadingService } from './../../../../core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  imports: [MatProgressBarModule, NgxSpinnerComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  private readonly loadingService = inject(LoadingService);
  public isLoading$ = this.loadingService.loading$;

  subscription!: Subscription;
  progress: number = 0;
  isLoading: boolean = false;
  progressInterval!: Subscription;

  ngOnInit(): void {
    this.subscription = this.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
      if (loading) {
        this.startProgress();
      } else {
        this.stopProgress();
      }
    });
  }

  startProgress() {
    this.stopProgress();
    this.progress = 0;
    this.progressInterval = interval(50).subscribe(() => {
      if (this.progress < 90) {
        this.progress += Math.random() * 2 + 0.5;
      }
    });
  }

  stopProgress() {
    if (this.progressInterval) {
      this.progressInterval.unsubscribe();
    }
    this.progress = 100;
    setTimeout(() => (this.progress = 0), 200);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.progressInterval) this.progressInterval.unsubscribe();
  }
}
