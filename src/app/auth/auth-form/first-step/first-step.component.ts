import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { emailValidator } from '../validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
})
export class FirstStepComponent implements OnInit {
  checkForm!: FormGroup;
  isLoading = false;
  subscription = new Subscription();
  @Output() nextStep = new EventEmitter<{
    email: string;
    registered: boolean;
  }>();
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.checkForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator]),
    });
  }
  googleSignIn() {
    this.authService.signInWithGoogle();
  }
  checkEmail() {
    this.isLoading = true;
    this.subscription = this.authService
      .checkEmai(this.checkForm.value.email)
      .subscribe((message) => {
        this.isLoading = false;
        let isRegistered;
        if (message.registered) {
          isRegistered = true;
        } else {
          isRegistered = false;
        }
        this.nextStep.next({
          email: this.checkForm.value.email,
          registered: isRegistered,
        });
      });
  }
}
