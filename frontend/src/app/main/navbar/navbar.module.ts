import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { setupModuleTranslations } from 'src/app/common/utils/translations_helpers';
import { PL_TRANSLATIONS } from './i18n/pl';
import { RouterModule } from '@angular/router';
import { AppLoaderModule } from '../app-loader/app-loader.module';
import { AuthDirectivesModule } from 'src/app/common/directives/auth/auth-directives.module';
import { MatIconModule } from '@angular/material/icon';
import { UserPopupModule } from './user-popup/user-popup.module';
import { UnathorizedUserNavigationComponent } from './unathorized-user-navigation/unathorized-user-navigation.component';

@NgModule({
  declarations: [
    NavbarComponent,
    UnathorizedUserNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserPopupModule,
    TranslateModule,

    AppLoaderModule,
    AuthDirectivesModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule {
  constructor(
    private translate: TranslateService
  ) {
    setupModuleTranslations(
      translate,
      'navbar',
      {
        pl: PL_TRANSLATIONS
      }
    );
  }
}
