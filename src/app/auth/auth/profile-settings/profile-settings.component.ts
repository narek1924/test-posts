import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { AuthService } from '../auth.service';

import {
  firstStepAnimation,
  nextStepAnimation,
} from 'src/app/shared/animations';
import { imagesRef, storage } from 'src/app/firebase-config';
import { DataStorageService } from 'src/app/shared/data-storage-service/data-storage.service';
import { ErrorModalComponent } from 'src/app/shared/UI/error-modal/error-modal.component';
import { ConfirmDeleteComponent } from 'src/app/shared/UI/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  animations: [firstStepAnimation, nextStepAnimation],
})
export class ProfileSettingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  username!: string;
  userEmail!: string;
  deletePage = false;
  changePassword = false;
  subscription = new Subscription();
  animationDisabled = true;
  sendingEmail = false;
  emailSent = false;
  imageUrl!: string;
  imageLoading = false;
  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      this.authService.user.subscribe((data) => {
        this.userEmail = data.email;
      })
    );
    this.subscription.add(
      this.dataStorageService.profileImage.subscribe(
        (url) => (this.imageUrl = url)
      )
    );
    this.subscription.add(
      this.dataStorageService.name.subscribe((name) => (this.username = name))
    );
  }
  ngAfterViewInit(): void {
    this.animationDisabled = false;
  }
  logout() {
    this.authService.logout();
  }
  onDelete() {
    this.deletePage = true;
  }
  onPasswordChange() {
    this.changePassword = true;
  }
  deleteAccount() {
    this.matDialog
      .open(ConfirmDeleteComponent, {
        data: {
          data: 'deleteAccount',
        },
        panelClass: 'confirm-delete',
      })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.authService.deleteAccount();
        }
      });
  }
  resetPassword() {
    this.sendingEmail = true;
    this.authService.sendResetEmail(this.userEmail).subscribe((data) => {
      this.sendingEmail = false;
      this.emailSent = true;
    });
  }
  backToSettings(page: string) {
    if (page === 'reset') {
      this.emailSent = false;
      this.changePassword = false;
    } else {
      this.deletePage = false;
    }
  }
  imageSelect(event: any) {
    this.imageLoading = true;
    let image = event.target!.files[0];
    this.authService.user.pipe(take(1)).subscribe((user) => {
      uploadBytes(ref(storage, user.id), image).then((snapshot) => {
        getDownloadURL(ref(storage, user.id))
          .then((url) => {
            this.dataStorageService.addAvatar(user.id, url).subscribe(
              () => {
                this.imageLoading = false;
              },
              (error) => {
                this.matDialog.open(ErrorModalComponent, {
                  data: 'connection',
                  panelClass: 'error-modal',
                  disableClose: true,
                });
              }
            );
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
