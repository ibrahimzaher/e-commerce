import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, throwError } from 'rxjs';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (['POST', 'PUT', 'DELETE'].includes(req.method) && event instanceof HttpResponse) {
        const message = event.body?.message || event.body?.status || 'Operation successful!';
        toastr.success(message, 'Success');
      }
    })
  );
};
