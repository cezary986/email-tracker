import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowActionComponent } from './table-row-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TableRowCounterComponent } from './table-row-counter/table-row-counter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableRowActionComponent,
    TableRowCounterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,

    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    TableRowActionComponent,
    TableRowCounterComponent
  ]
})
export class TableRowActionModule { }
