import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { LoadingSpinnerSmallComponent } from '../UI/loading-spinner/loading-spinner-small/loading-spinner-small.component';
import { LoadingSpinnerComponent } from '../UI/loading-spinner/loading-spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModalComponent } from '../UI/error-modal/error-modal.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    LoadingSpinnerSmallComponent,
    ErrorModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    LoadingSpinnerSmallComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
