import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailListRoutingModule } from './email-list-routing.module';
import { EmailListComponent } from './email-list.component';
import { MatButtonModule, MatIconModule, MatDialogModule, MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { EmailAddEditModalModule } from '../email-add-edit-modal/email-add-edit-modal.module';
import { EmailListTableModule } from './email-list-table/email-list-table.module';
import { SearchBoxModule } from 'src/app/common/components/search-box/search-box.module';


@NgModule({
  declarations: [
    EmailListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    EmailListRoutingModule,
    EmailAddEditModalModule,

    EmailListTableModule,
    TranslateModule,
    SearchBoxModule,
    MatCardModule,

    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    EmailListComponent
  ]
})
export class EmailListModule { }
