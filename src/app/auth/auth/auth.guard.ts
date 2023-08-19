import { Injectable, inject } from '@angular/core';

import {
  CanActivateFn,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
export function authenticationGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!!oauthService.user) {
      return true;
    }

    return router.createUrlTree(['/auth']);
  };
}
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivateFn{
//   constructor(private authService: AuthService, private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     return this.authService.user.pipe(
//       map((user) => {
//         const isAuth = !!user;
//         if (isAuth) {
//           return true;
//         }
//         return this.router.createUrlTree(['/auth']);
//       })
//     );
//   }
//   export function authenticationGuardArrow = () => inject(AuthService).isAuthenticated()
// In this guard, we are injecting the AuthService and calling the
// }
