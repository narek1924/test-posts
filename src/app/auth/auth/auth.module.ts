import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: AuthComponent }];
@NgModule({
  declarations: [AuthComponent, AuthFormComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
