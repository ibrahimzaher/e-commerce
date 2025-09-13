import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from './../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageService = inject(StorageService);
  private readonly _isDark: WritableSignal<boolean> = signal(false);
  readonly isDark = this._isDark.asReadonly();
  initTheme() {
    if (this.storageService.isBrowser) {
      const isDarkNow = document.documentElement.classList.toggle(
        'dark',
        this.storageService.getItem('theme') === 'dark' ||
          (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
      this._isDark.set(isDarkNow);
    }
  }

  setDarkMode() {
    if (this.storageService.isBrowser) {
      this._isDark.set(true);
      document.documentElement.classList.add('dark');
      this.storageService.setItem('theme', 'dark');
    }
  }
  setLightMode() {
    if (this.storageService.isBrowser) {
      this._isDark.set(false);
      document.documentElement.classList.remove('dark');
      this.storageService.setItem('theme', 'light');
    }
  }
  toggleTheme() {
    if (this.storageService.isBrowser) {
      this._isDark.set(!this._isDark());
      document.documentElement.classList.toggle('dark');
      if (document.documentElement.classList.contains('dark')) {
        this.storageService.setItem('theme', 'dark');
      } else {
        this.storageService.setItem('theme', 'light');
      }
    }
  }
}
