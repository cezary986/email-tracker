import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPopupComponent } from './user-popup.component';
import { HttpClientModule } from '@angular/common/http';

import { AvatarModule } from 'ngx-avatar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { setupModuleTranslations } from 'src/app/common/utils/translations_helpers';
import { PL_TRANSLATIONS } from './i18n/pl';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordModule } from 'src/app/auth/change-password/change-password.module';

@NgModule({
  declarations: [
    UserPopupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,

    ChangePasswordModule,

    AvatarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  exports: [
    UserPopupComponent
  ]
})
export class UserPopupModule {
  constructor(
    private translate: TranslateService
  ) {
    setupModuleTranslations(
      translate,
      'user_popup',
      {
        pl: PL_TRANSLATIONS
      }
    );
  }
}
