import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loggedGuard: CanActivateFn = (route, state) => {
  const toastrService=inject(ToastrService);
  const router=inject(Router);
  const platformId=inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/analysis']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }






};
