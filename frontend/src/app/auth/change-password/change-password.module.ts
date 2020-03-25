import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormErrorModule } from 'src/app/common/forms/form-error/form-error.module';
import { FormsDirectivesModule } from 'src/app/common/directives/forms/forms-directives.module';
import { setupModuleTranslations } from 'src/app/common/utils/translations_helpers';
import { PL_TRANSLATIONS } from './i18n/pl';
import { MatIconModule } from '@angular/material/icon';
import { ErrorAlertModule } from 'src/app/common/components/error-alert/error-alert.module';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormErrorModule,
    FormsDirectivesModule,
    FormErrorModule,
    ErrorAlertModule,
    TranslateModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  entryComponents: [
    ChangePasswordComponent
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule {

  constructor(
    private translate: TranslateService
  ) {
    setupModuleTranslations(
      translate,
      'change_password',
      {
        pl: PL_TRANSLATIONS
      }
    );
  }
}

