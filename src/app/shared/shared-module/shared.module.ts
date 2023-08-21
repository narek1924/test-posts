import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { LoadingSpinnerSmallComponent } from '../UI/loading-spinner/loading-spinner-small/loading-spinner-small.component';
import { LoadingSpinnerComponent } from '../UI/loading-spinner/loading-spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModalComponent } from '../UI/error-modal/error-modal.component';
import { FetchLoadingComponent } from '../UI/fetch-loading/fetch-loading.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    LoadingSpinnerSmallComponent,
    FetchLoadingComponent,
    ErrorModalComponent,
  ],
  imports: [],
  exports: [
    LoadingSpinnerComponent,
    LoadingSpinnerSmallComponent,
    FetchLoadingComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    // BrowserAnimationsModule,
  ],
})
export class SharedModule {}
