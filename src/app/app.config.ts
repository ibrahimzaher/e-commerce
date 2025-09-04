import { LangService } from './core/services/lang/lang.service';
import { ThemeService } from './core/services/theme/theme.service';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './core/auth/services/auth/auth.service';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { toasterInterceptor } from './core/interceptors/toaster/toaster-interceptor';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, toasterInterceptor, headerInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      lang: 'en',
      fallbackLang: 'en',
    }),
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      const langService = inject(LangService);
      const auth = inject(AuthService);
      langService.init();
      themeService.initTheme();
    }),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      newestOnTop: true,
      progressAnimation: 'increasing',
      progressBar: true,
    }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
  ],
};
