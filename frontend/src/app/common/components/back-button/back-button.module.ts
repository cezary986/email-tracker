import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class BackButtonModule { }
