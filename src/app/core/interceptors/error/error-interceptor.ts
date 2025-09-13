import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      let message = 'Something went wrong!';

      if (error.status === 0) {
        message = 'Network error: Please check your internet connection.';
      } else if (error.status === 500) {
        message = 'Server error. Please try again later.';
      } else {
        message =
          error.error?.errors?.msg ||
          error.error?.message ||
          error.message ||
          error.error?.statusMsg ||
          message;
      }

      toastr.error(message, 'Error');

      return throwError(() => error);
    })
  );
};
