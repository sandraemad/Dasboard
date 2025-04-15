import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toastrService=inject(ToastrService);
  const router=inject(Router);
  const platformId=inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      toastrService.error("لا يمكنك الدخول على هذه الصفحة", "خطأ!");
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }

};
