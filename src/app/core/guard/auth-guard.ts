import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './../auth/services/auth/auth.service';

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
