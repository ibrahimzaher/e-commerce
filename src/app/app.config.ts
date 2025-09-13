import {
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthService } from './core/auth/services/auth/auth.service';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { successInterceptor } from './core/interceptors/success/success-interceptor';
import { LangService } from './core/services/lang/lang.service';
import { ThemeService } from './core/services/theme/theme.service';
import { provideLoadingBarInterceptor } from '@ngx-loading-bar/http-client';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([
        successInterceptor,
        errorInterceptor,
        headerInterceptor,
        loadingInterceptor,
      ])
    ),
    provideLoadingBarInterceptor(),
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
      timeOut: 1000,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
  ],
};
