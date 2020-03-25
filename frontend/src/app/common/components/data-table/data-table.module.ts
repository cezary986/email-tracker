import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableRowActionModule } from '../table-row-action/table-row-action.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { TableRowSelectComponent } from './table-row-select/table-row-select.component';


@NgModule({
  declarations: [
    TableRowSelectComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TableRowActionModule,

    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule
  ],
  exports: [
    TableRowSelectComponent,
    TranslateModule,
    TableRowActionModule,

    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
  ]
})
/**
 * Dzielony moduł z wszystkimi zaleznościami dla modułów komponentow tabel
 */
export class DataTableModule { }
