import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function loginGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (!oauthService.hasAccess()) {
      return true;
    }
    return router.createUrlTree(['/main']);
  };
}
