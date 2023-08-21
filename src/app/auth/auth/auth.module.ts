import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { FirstStepComponent } from '../auth-form/first-step/first-step.component';
import { SecondStepComponent } from '../auth-form/second-step/second-step.component';
import { ResetPasswordComponent } from '../auth-form/reset-password/reset-password.component';

const routes: Routes = [{ path: '', component: AuthComponent }];
@NgModule({
  declarations: [
    AuthComponent,
    AuthFormComponent,
    ProfileSettingsComponent,
    FirstStepComponent,
    SecondStepComponent,
    ResetPasswordComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [AuthComponent, AuthFormComponent],
})
export class AuthModule {}
