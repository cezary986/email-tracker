import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyToClipboardComponent } from './copy-to-clipboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { setupModuleTranslations } from '../../utils/translations_helpers';
import { PL_TRANSLATIONS } from './i18n/pl';


@NgModule({
  declarations: [
    CopyToClipboardComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,

    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CopyToClipboardComponent
  ]
})
export class CopyToClipboardModule {
  constructor(
    private translate: TranslateService
  ) {
    setupModuleTranslations(
      translate,
      'copy_to_clipboard',
      {
        pl: PL_TRANSLATIONS
      }
    );
  }
}
