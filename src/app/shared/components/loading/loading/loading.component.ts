import { Subscription, interval } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from './../../../../core/services/loading/loading.service';
import { NgxSpinnerComponent } from 'ngx-spinner';

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
    this.stopProgress(); // أوقف أي مؤقت سابق
    this.progress = 0;
    this.progressInterval = interval(50).subscribe(() => {
      if (this.progress < 90) {
        // يزيد تدريجياً حتى 90٪
        this.progress += Math.random() * 2 + 0.5; // زيادة عشوائية صغيرة → شعور طبيعي
      }
    });
  }

  stopProgress() {
    if (this.progressInterval) {
      this.progressInterval.unsubscribe();
    }
    this.progress = 100; // عند الانتهاء، اجعلها 100%
    setTimeout(() => (this.progress = 0), 200); // إعادة التهيئة بعد قليل
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.progressInterval) this.progressInterval.unsubscribe();
  }
}
