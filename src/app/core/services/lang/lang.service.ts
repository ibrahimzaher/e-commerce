import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private readonly translateService = inject(TranslateService);
  private readonly storageService = inject(StorageService);

  private readonly _lang: WritableSignal<string> = signal('');
  readonly lang = this._lang.asReadonly();
  init() {
    this.translateService.addLangs(['en', 'ar']);

    if (this.storageService.isBrowser) {
      const lang = this.storageService.getItem('lang');
      document.documentElement.setAttribute('lang', lang === null ? 'en' : lang);
      document.documentElement.setAttribute('dir', lang === 'en' || lang === null ? 'ltr' : 'rtl');
      this.translateService.setFallbackLang('en');
      if (lang === null) {
        this.translateService.use('en');
        this._lang.set('en');
      } else {
        this.translateService.use(lang);
        this._lang.set(lang);
      }
    }
  }
  changeLang(lang: string) {
    if (this.storageService.isBrowser) {
      this.storageService.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
      this._lang.set(lang);
    }
    this.translateService.setFallbackLang('en');
    this.translateService.use(lang);
  }
}
