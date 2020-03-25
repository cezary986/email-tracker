import { Component } from '@angular/core';
import { BaseTableComponent } from 'src/app/common/components/data-table/base-table-component';
import { Email } from 'src/app/common/models/email';

@Component({
  selector: 'app-email-list-table',
  templateUrl: './email-list-table.component.html',
  styleUrls: ['./email-list-table.component.scss']
})
export class EmailListTableComponent extends BaseTableComponent<Email> {

  constructor() {
    super(['title', 'addressee', 'firstReaded', 'lastReaded'], 'id');
    this.initialized = true;
  }
}
