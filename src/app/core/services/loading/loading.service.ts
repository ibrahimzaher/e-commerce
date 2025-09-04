import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loading.asObservable();

  private requests = 0;

  show(): void {
    this.requests++;
    this.loading.next(true);
  }

  hide(): void {
    if (this.requests > 0) {
      this.requests--;
    }
    if (this.requests === 0) {
      this.loading.next(false);
    }
  }
}
