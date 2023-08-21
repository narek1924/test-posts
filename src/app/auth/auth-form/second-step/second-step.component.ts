import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../validators';
interface AuthForm {
  email: FormControl;
  password: FormControl;
  name?: FormControl;
  confirmPassword?: FormControl;
}

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent implements OnInit {
  authForm!: FormGroup;
  passwordVisible = false;
  @Output() submitForm = new EventEmitter<{
    password: string;
    name?: string;
  }>();
  @Output() passwordReset = new EventEmitter();
  @Output() firstStep = new EventEmitter();
  @Input() email!: string;
  @Input() isRegistered!: boolean;
  @Input() error!: string;
  ngOnInit(): void {
    let authForm: AuthForm = {
      email: new FormControl(this.email),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    };
    if (!this.isRegistered) {
      authForm.name = new FormControl('', nameValidator);
    }
    this.authForm = new FormGroup(authForm);
  }
  backToFirstStep() {
    this.firstStep.next(true);
  }
  resetPassword() {
    this.passwordReset.next(true);
  }
  submit() {
    if (this.authForm.valid) {
      this.submitForm.next({
        password: this.authForm.value.password,
        name: this.authForm.value.name,
      });
    }
  }
}
