import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailListTableComponent } from './email-list-table.component';
import { TranslateService } from '@ngx-translate/core';
import { setupModuleTranslations } from 'src/app/common/utils/translations_helpers';
import { PL_TRANSLATIONS } from './i18n/pl';
import { DataTableModule } from 'src/app/common/components/data-table/data-table.module';


@NgModule({
  declarations: [
    EmailListTableComponent
  ],
  imports: [
    CommonModule,
    DataTableModule
  ],
  exports: [
    EmailListTableComponent
  ]
})
export class EmailListTableModule {
  constructor(
    private translate: TranslateService
  ) {
    setupModuleTranslations(
      translate,
      'leagues_list_table',
      {
        pl: PL_TRANSLATIONS
      }
    );
  }
}
