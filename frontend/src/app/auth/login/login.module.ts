import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { setupModuleTranslations } from 'src/app/common/utils/translations_helpers';
import { PL_TRANSLATIONS } from '../i18n/pl';
import { FormsDirectivesModule } from 'src/app/common/directives/forms/forms-directives.module';
import { FormErrorModule } from 'src/app/common/forms/form-error/form-error.module';
import { ErrorAlertModule } from 'src/app/common/components/error-alert/error-alert.module';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/auth/', '.json');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),

    LoginRoutingModule,
    FormsDirectivesModule,
    FormErrorModule,
    ErrorAlertModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class LoginModule {
  constructor(private translateService: TranslateService) {
    setupModuleTranslations(
      this.translateService,
      'auth',
      {
        pl: PL_TRANSLATIONS
      });
  }
}
