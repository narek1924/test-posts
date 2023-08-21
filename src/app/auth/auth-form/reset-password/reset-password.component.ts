import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  emailSent = false;
  sendingEmail = false;
  @Input() email!: string;
  @Output() backToAuth = new EventEmitter();
  constructor(private authService: AuthService) {}
  back() {
    this.backToAuth.next(true);
  }
  sendResetEmail() {
    this.sendingEmail = true;
    this.authService.sendResetEmail(this.email).subscribe((data) => {
      this.sendingEmail = false;
      this.emailSent = true;
    });
  }
}
