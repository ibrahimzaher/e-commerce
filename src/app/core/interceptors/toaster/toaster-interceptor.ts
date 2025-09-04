import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const toasterInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (['POST', 'PUT', 'DELETE'].includes(req.method) && event instanceof HttpResponse) {
        const message = event.body?.message || 'Operation successful!';
        console.log(event);

        toastr.success(message, 'Success');
      }
    }),
    catchError((error) => {
      if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        const message =
          error.error.errors?.msg ||
          error.error?.message ||
          error.message ||
          'Something went wrong!';
        toastr.error(message, 'Error');
      }
      return throwError(() => error);
    })
  );
};
