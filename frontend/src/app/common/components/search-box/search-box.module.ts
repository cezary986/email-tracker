import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatButtonModule
  ],
  exports: [
    SearchBoxComponent
  ]
})
export class SearchBoxModule { }
