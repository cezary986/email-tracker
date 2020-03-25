import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialFocusDirective } from './initial-focus.directive';
import { ClickOnEnterDirective } from './click-on-enter';



@NgModule({
  declarations: [
    InitialFocusDirective,
    ClickOnEnterDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialFocusDirective,
    ClickOnEnterDirective
  ]
})
export class FormsDirectivesModule { }
