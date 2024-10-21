import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auhservice = inject(AuthService)
  const router = inject(Router)

  if (auhservice.isLoggedIn()) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
