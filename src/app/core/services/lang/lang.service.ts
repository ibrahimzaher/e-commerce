import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './../storage/storage.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private readonly translateService = inject(TranslateService);
  private readonly storageService = inject(StorageService);
  lang: BehaviorSubject<string> = new BehaviorSubject<string>('');
  observable() {
    return this.lang.asObservable();
  }
  init() {
    this.translateService.addLangs(['en', 'ar']);

    if (this.storageService.isBrowser) {
      const lang = this.storageService.getItem('lang');
      document.documentElement.setAttribute('lang', lang === null ? 'en' : lang);
      document.documentElement.setAttribute('dir', lang === 'en' || lang === null ? 'ltr' : 'rtl');
      this.translateService.setFallbackLang('en');
      if (lang === null) {
        this.translateService.use('en');
        this.lang.next('en');
      } else {
        this.translateService.use(lang);
        this.lang.next(lang);
      }
    }
  }
  changeLang(lang: string) {
    if (this.storageService.isBrowser) {
      this.storageService.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
      this.lang.next(lang);
    }
    this.translateService.setFallbackLang('en');
    this.translateService.use(lang);
  }
}
