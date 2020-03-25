import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInDirective } from './logged-in.directive';
import { RoleDirective } from './role.directive';



@NgModule({
  declarations: [
    LoggedInDirective,
    RoleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoggedInDirective,
    RoleDirective
  ]
})
export class AuthDirectivesModule { }
