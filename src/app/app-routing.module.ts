import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './auth/auth/auth.guard';
import { loginGuard } from './auth/auth/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [loginGuard()],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main/main.module').then((m) => m.MainModule),
    canActivate: [authenticationGuard()],
  },
  { path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
