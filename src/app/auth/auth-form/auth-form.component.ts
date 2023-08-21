import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { take, Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage-service/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  firstStepAnimation,
  nextStepAnimation,
  itemAnimation,
} from 'src/app/shared/animations';
import { ConfirmDeleteComponent } from 'src/app/shared/UI/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  animations: [firstStepAnimation, nextStepAnimation, itemAnimation],
})
export class AuthFormComponent implements OnInit, AfterViewInit {
  email!: string;
  showPassword = false;
  subscription!: Subscription;
  animationDisabled = true;
  registerForm!: FormGroup;
  isRegistered!: boolean;
  firstStep = true;
  passwordReset = false;
  isLoading = false;
  emailSent = false;
  sendingEmail = false;
  error: string = null as any;
  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private dataService: DataStorageService
  ) {}
  ngOnInit(): void {
    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required, this.customEmailValidator]],
    //   name: ['', [Validators.required]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    // });
  }
  ngAfterViewInit(): void {
    this.animationDisabled = false;
  }
  nextStep(firstStepInfo: { email: string; registered: boolean }) {
    console.log(firstStepInfo);

    this.firstStep = false;
    this.email = firstStepInfo.email;
    this.isRegistered = firstStepInfo.registered;
  }
  submitData(formData: { password: string; name?: string }) {
    if (formData.name) {
      this.isLoading = true;
      this.authService
        .signUp(this.email, formData.password, formData.name)
        .pipe(take(1))
        .subscribe(
          (data: any) => {
            this.dataService.name.next(data.name);

            this.router.navigate(['/my-day']);
            this.isLoading = false;
            this.dataService.fetching.next(false);
          },
          (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
            this.dataService.fetching.next(false);
          }
        );
    } else {
      this.isLoading = true;
      this.authService
        .login(this.email, formData.password)
        .pipe(take(1))
        .subscribe(
          () => {
            this.isLoading = false;
            this.dataService.fetching.next(false);
            this.router.navigate(['/my-day']);
          },
          (errorMessage) => {
            this.error = errorMessage;
            this.dataService.fetching.next(false);
            this.isLoading = false;
          }
        );
    }
  }
  resetPassword() {
    this.passwordReset = true;
  }
  backToFirstStep() {
    let dialogRef = this.matDialog.open(ConfirmDeleteComponent, {
      data: {
        data: 'auth',
      },
      panelClass: 'confirm-delete',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firstStep = true;
        this.isRegistered = null as any;
        this.email = '';
        this.error = null as any;
      }
    });
  }
  sendResetEmail() {
    this.sendingEmail = true;
    this.authService
      .sendResetEmail(this.registerForm.get('email')?.value)
      .subscribe((data) => {
        this.sendingEmail = false;
        this.emailSent = true;
      });
  }
  backToAuth() {
    this.passwordReset = false;
    this.emailSent = false;
  }
}
