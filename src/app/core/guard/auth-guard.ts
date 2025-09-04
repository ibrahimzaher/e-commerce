import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './../auth/services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }
  const token = authService.getToken();
  if (!token) {
    return router.parseUrl('/login');
  }
  return authService.verifyToken(token).pipe(
    map((res) => (res.message === 'verified' ? true : router.parseUrl('/login'))),
    catchError(() => {
      authService.removeToken();
      return of(router.parseUrl('/login'));
    })
  );
};
