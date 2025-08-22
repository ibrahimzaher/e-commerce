import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './../storage/storage.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageService = inject(StorageService);
  private readonly isDark: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  initTheme() {
    if (this.storageService.isBrowser) {
      const isDarkNow = document.documentElement.classList.toggle(
        'dark',
        this.storageService.getItem('theme') === 'dark' ||
          (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
      this.isDark.next(isDarkNow);
    }
  }
  observable() {
    return this.isDark.asObservable();
  }
  setDarkMode() {
    if (this.storageService.isBrowser) {
      this.isDark.next(true);
      document.documentElement.classList.add('dark');
      this.storageService.setItem('theme', 'dark');
    }
  }
  setLightMode() {
    if (this.storageService.isBrowser) {
      this.isDark.next(false);
      document.documentElement.classList.remove('dark');
      this.storageService.setItem('theme', 'light');
    }
  }
  toggleTheme() {
    if (this.storageService.isBrowser) {
      this.isDark.next(!this.isDark.value);
      document.documentElement.classList.toggle('dark');
      if (document.documentElement.classList.contains('dark')) {
        this.storageService.setItem('theme', 'dark');
      } else {
        this.storageService.setItem('theme', 'light');
      }
    }
  }
}
