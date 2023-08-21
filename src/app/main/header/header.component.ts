import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage-service/data-storage.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfileSettingsComponent } from 'src/app/auth/auth/profile-settings/profile-settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  imageUrl!: string;
  username!: string;
  constructor(
    private dataStorageService: DataStorageService,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      this.dataStorageService.profileImage.subscribe((imageUrl) => {
        this.imageUrl = imageUrl;
      })
    );
    this.subscription.add(
      this.dataStorageService.name.subscribe((name) => (this.username = name))
    );
  }
  profileSettings() {
    this.matDialog.open(ProfileSettingsComponent, {
      panelClass: 'profile-settings-modal',
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
