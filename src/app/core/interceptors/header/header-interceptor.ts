import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from './../../services/storage/storage.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItem('token');
  if (
    ['auth', 'wishlist', 'addresses', 'cart', 'orders', 'users'].some((key) =>
      req.url.includes(key)
    )
  ) {
    if (token) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }
  return next(req);
};
