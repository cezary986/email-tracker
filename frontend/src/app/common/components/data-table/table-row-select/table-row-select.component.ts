import { Component, Input } from '@angular/core';
import { TableHelper } from 'src/app/common/utils/table-helpers/table-helper';

@Component({
  selector: 'app-table-row-select',
  templateUrl: './table-row-select.component.html',
  styleUrls: ['./table-row-select.component.scss']
})
export class TableRowSelectComponent {

  @Input() tableHelper: TableHelper<any>;
  @Input() row: any;
  @Input() master;
}
