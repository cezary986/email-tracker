import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoaderComponent } from './app-loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppLoaderComponent
  ],
  imports: [
    CommonModule,

    MatProgressBarModule
  ],
  exports: [
    AppLoaderComponent
  ]
})
export class AppLoaderModule { }
