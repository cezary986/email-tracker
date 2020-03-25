import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorAlertComponent } from './error-alert.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ErrorAlertComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule
  ],
  exports: [
    ErrorAlertComponent
  ]
})
export class ErrorAlertModule { }
