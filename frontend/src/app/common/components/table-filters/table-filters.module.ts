import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SingleSelectionFilterComponent } from './single-selection-filter/single-selection-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterHelpers } from './filter-helper';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    SingleSelectionFilterComponent,
    CheckboxFilterComponent
  ],
  providers: [
    FilterHelpers
  ],
  imports: [
    CommonModule,
    TranslateModule,

    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  exports: [
    SingleSelectionFilterComponent,
    CheckboxFilterComponent
  ]
})
export class TableFiltersModule { }
