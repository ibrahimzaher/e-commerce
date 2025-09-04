import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }
  const token = authService.getToken();
  if (!token) return of(true);
  return authService.verifyToken(token).pipe(
    map((res) => (res.message === 'verified' ? router.parseUrl('/home') : true)),
    catchError(() => {
      authService.removeToken();
      return of(true);
    })
  );
};
