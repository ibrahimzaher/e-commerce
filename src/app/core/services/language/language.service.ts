import { platform } from 'os';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platform: object, private translate: TranslateService) {
    this.isBrowser = isPlatformBrowser(platform);
    this.translate.addLangs(['en', 'ar']);
    this.setInitialLang();
  }
  private setInitialLang() {
    let savedLang = 'en';
    if (this.isBrowser) {
      savedLang = localStorage.getItem('lang') || 'en';
    }
    this.translate.setFallbackLang(savedLang);
    this.translate.use(savedLang);
    this.setDirection(savedLang);
  }
  changeLang(lang: string) {
    this.translate.use(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
    }
    this.setDirection(lang);
  }

  private setDirection(lang: string) {
    if (this.isBrowser) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }
  get currentLanguage() {
    return this.translate.getCurrentLang() || localStorage.getItem('lang') || 'en';
  }
}
