import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldWithActionComponent } from './form-field-with-action/form-field-with-action.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomDateTimePickerComponent } from './custom-datepicker/custom-datepicker.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NgxMaterialTimepickerModule, NgxMaterialTimepickerDialControlComponent } from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    FormFieldWithActionComponent,
    CustomDateTimePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,

    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.setLocale('pl')
  ],
  entryComponents: [
    NgxMaterialTimepickerDialControlComponent
  ],
  exports: [
    FormFieldWithActionComponent,
    CustomDateTimePickerComponent
  ]
})
export class CustomFormsModule { }
