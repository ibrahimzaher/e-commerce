import { inject } from '@angular/core';
import { LoadingService } from './../../services/loading/loading.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const spinner = inject(NgxSpinnerService);
  loadingService.show();
  spinner.show();
  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
      spinner.hide();
    })
  );
};
