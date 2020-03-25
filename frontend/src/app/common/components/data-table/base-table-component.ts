import { Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TableRowAction, TableRowCounter } from '../table-row-action/utils/table_action';
import { TableRowActionClickEvent } from '../table-row-action/utils/action-click-event';
import { MatTableDataSource } from '@angular/material/table';
import { TableHelper } from '../../utils/table-helpers/table-helper';
import { Observable, Subject } from 'rxjs';
import { SelectionChange } from '../../utils/table-helpers/select-model';
import { takeUntil } from 'rxjs/operators';

export function serializeRow(row: any): string {
  return Object.keys(row).reduce((
    (currentTerm, key) => {
      // Use an obscure Unicode character to delimit the words in the concatenated string.
      // This avoids matches where the values of two columns combined will match the user's query
      // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
      // that has a very low chance of being typed in by somebody in a text field. This one in
      // particular is "White up-pointing triangle with dot" from
      // https://en.wikipedia.org/wiki/List_of_Unicode_characters
      return currentTerm + (((row)))[key] + '◬';
    }), '').toLowerCase();
}

/**
 * Bazowa klasa dla wszystkich komponentów typu tabela z danymi
 */
export class BaseTableComponent<T> implements OnDestroy {

  /**
   * Zapytanie filtrujące wiersze tabeli
   */
  @Input() set searchQuery(searchQuery: string) {
    if (searchQuery !== null && searchQuery !== undefined) {
      this.tableHelper.setFilter(searchQuery);
    }
  }
  /**
   * Tablica z elementami wierszy
   */
  @Input() set elements(leagues: T[]) {
    if (leagues !== null && leagues !== undefined) {
      this.tableHelper.setElements(leagues);
    }
  }
  /**
   * Dodatkowe akcje dostępne w ramach wiersza
   */
  @Input() set actions(actions: TableRowAction[]) {
    if (actions !== null && actions !== undefined) {
      this.tableHelper.setActions(actions);
    }
  }
  /**
   * Ustawienei aktualnie wybranych elementów tabeli
   */
  @Input() set selected(elements: T[]) {
    this.tableHelper.enableSelection(true);
    this.tableHelper.enableMultipleSelection(elements.length > 1);
    this.tableHelper.setSelectedElements(elements);
  }
  /**
   * Włączenie lub wyłączenie możliwości zaznaczania wierszy
   */
  @Input() set enableSelection(enable: boolean) {
    this.tableHelper.enableSelection(enable);
  }
  /**
   * Włączenie lub wyłączenie możliwości zaznaczania wielu wierszy naraz
   */
  @Input() set multiple(enable: boolean) {
    this.tableHelper.enableMultipleSelection(enable);
  }

  @Input() set loading(value: boolean) {
    this.tableHelper.loading = value;
  }
  @Input() clickable = false;
  @Input() emptyMessage: string = null;
  // tslint:disable-next-line: variable-name
  public _counterColumn: TableRowCounter = null;
  @Input() set counterColumn(value: TableRowCounter) {
    this._counterColumn = value;
    this.tableHelper.pushCounterColumn();
  }

  @Output() actionClick: EventEmitter<TableRowActionClickEvent> = new EventEmitter();
  @Output() rowClick: EventEmitter<T> = new EventEmitter();
  @Output() selectionChange: EventEmitter<SelectionChange<T>> = new EventEmitter();
  @Output() counterValueChange: EventEmitter<{row: T, value: number}> = new EventEmitter();

  public tableHelper: TableHelper<T>;
  public dataSource: MatTableDataSource<T>;
  public displayedColumns: Observable<string[]>;
  public initialized = false;
  private unsubsribe: Subject<void> = new Subject();


  constructor(displayColumns: string[], uniqueFieldName: string) {
    this.tableHelper = new TableHelper(displayColumns, uniqueFieldName);
    this.dataSource = this.tableHelper.getDataSource();
    this.displayedColumns = this.tableHelper.observeDisplayedColumns();
    this.tableHelper.observeSelectionChanges()
      .pipe(takeUntil(this.unsubsribe))
      .subscribe((selectedRows) => {
        this.selectionChange.emit(selectedRows);
      });
  }

  public setFilterPredicate(filterPredicate: (data: T, filter: string) => boolean) {
    this.tableHelper.getDataSource().filterPredicate = filterPredicate;
  }

  public onCounterValueChange(row: T, value) {
    this.counterValueChange.emit({row, value});
  }

  ngOnDestroy(): void {
    this.unsubsribe.next();
    this.unsubsribe.complete();
  }
}
