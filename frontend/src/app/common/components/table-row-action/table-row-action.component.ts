import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTableRowAction } from './utils/table_action';

@Component({
  selector: 'app-table-row-actions',
  templateUrl: './table-row-action.component.html',
  styleUrls: ['./table-row-action.component.scss']
})
export class TableRowActionComponent {

  @Input() model: any = null;
  @Output() actionClick: EventEmitter<BaseTableRowAction> = new EventEmitter();

  public onActionClick(action: BaseTableRowAction, event: Event) {
    event.stopPropagation();
    this.actionClick.emit(action);
  }

  public onMenuItemClick(menuItem: BaseTableRowAction, event: Event) {
    this.actionClick.emit(menuItem);
  }
}
