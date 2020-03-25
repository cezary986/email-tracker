import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaQueryDirective } from './media-query.directive';

@NgModule({
  declarations: [
    MediaQueryDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MediaQueryDirective
  ]
})
export class MediaQueryModule {}
