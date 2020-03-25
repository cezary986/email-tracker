import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavbarModule } from './navbar/navbar.module';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavbarModule,

    MatSidenavModule
  ]
})
export class MainModule { }
