import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { EmailListModule } from '../email-list/email-list.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,

    EmailListModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
