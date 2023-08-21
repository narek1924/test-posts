import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';
import { DataStorageService } from './shared/data-storage-service/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading = false;
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.dataStorageService.fetching.subscribe((condition) => {
      this.loading = condition;
    });
  }
  title = 'test-posts';
}
