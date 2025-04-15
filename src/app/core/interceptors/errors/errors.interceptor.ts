import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';// Adjust the path as per your project structure

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      console.log("inter",err.error?.errorMessage);
      toastrService.error(err.error?.errorMessage || 'حدث خطأ غير متوقع', 'خطأ');

      return throwError(() => err);
      })
    );
};
