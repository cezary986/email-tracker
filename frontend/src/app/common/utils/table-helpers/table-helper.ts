import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Subject, Observable, BehaviorSubject } from 'rxjs';
import { TableRowAction, TableRowMenu } from '../../components/table-row-action/utils/table_action';
import { SelectionModel, SelectionChange } from './select-model';
import { filter } from 'rxjs/operators';

/**
 * Pomocnicza klasa do obsługi akcji związanych z tabelami, takich jak:
 *  -filtrowanie
 *  -sortowanie
 *  -akcje dla wierszy
 *  -zaznaczanie
 */
export class TableHelper<T> {

    private dataSource: MatTableDataSource<T> = new MatTableDataSource();
    public selection: SelectionModel<T> = null;
    public selectionSubscription: Subscription = null;
    public actionsList: TableRowAction[] = [];

    public uniqueFieldName: string;
    private displayedColumns: string[];
    private displayedColumnsSubject: BehaviorSubject<string[]> = null;

    public loading = true;

    private selectionChange: Subject<SelectionChange<T>> = new Subject();

    constructor(displayedColumns: string[], uniqueFieldName: string) {
        this.uniqueFieldName = uniqueFieldName;
        this.displayedColumns = displayedColumns;
        this.displayedColumnsSubject = new BehaviorSubject(displayedColumns);
    }

    public setFilter(filterValue: string) {
        if (filterValue !== undefined && filterValue !== null) {
            if (filterValue[filterValue.length - 1] === ' ') {
                filterValue = filterValue.slice(0, -1) + '◬';
            }
            this.dataSource.filter = filterValue.toLowerCase();
        }
    }

    public setElements(elements: T[]) {
        if (elements !== null) {
            this.dataSource.data = elements;
            this.loading = false;
        }
    }

    public setSelectedElements(selectedElements: T[]) {
        if (this.selection == null) {
            this.selection = new SelectionModel<T>(selectedElements, this.uniqueFieldName);
            this.enableSelection(true);

        }
        for (const element of selectedElements) {
            this.selection.select(element);
        }
    }

    public enableSelection(enable: boolean) {
        if (enable && this.selectionSubscription === null) {
            if (this.selection === null) {
                this.selection = new SelectionModel<T>([], this.uniqueFieldName);
            }
            this.displayedColumns.unshift('select');
            this.displayedColumnsSubject.next(this.displayedColumns);
            this.selectionSubscription = this.selection.onChange
                .subscribe((change) => {
                    this.selectionChange.next(change);
                });
        } else if (!enable && this.selection !== null) {
            this.selectionSubscription.unsubscribe();
            this.selectionSubscription = null;
            this.selection = null;
            this.displayedColumns.splice(this.displayedColumns.indexOf('select'), 1);
            this.displayedColumnsSubject.next(this.displayedColumns);
        }
    }

    public enableMultipleSelection(enable: boolean) {
        this.selection.multiple = enable;
    }

    public masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    public setActions(actions: (TableRowAction | TableRowMenu)[]) {
        if (actions !== null && actions !== undefined) {
            this.actionsList = actions;
            this.displayedColumns.push('actions');
        } else {
            const index = this.displayedColumns.findIndex((element) => element === 'actions');
            if (index >= 0) {
                this.displayedColumns.splice(index, 1);
            }
        }
    }

    public pushCounterColumn() {
        const index = this.displayedColumns.findIndex((element) => element === 'actions');
        if (index >= 0) {
            this.displayedColumns.splice(index, 0, 'counter');
        } else {
            this.displayedColumns.push('counter');
        }
    }

    public getDataSource(): MatTableDataSource<T> {
        return this.dataSource;
    }

    public observeDisplayedColumns(): Observable<string[]> {
        return this.displayedColumnsSubject;
    }

    public observeSelectionChanges(): Observable<SelectionChange<T>> {
        return this.selectionChange;
    }

    public setDisplayedColumns(columns: string[]) {
        this.displayedColumns = columns;
        this.displayedColumnsSubject.next(this.displayedColumns);
    }

    public setUniqueFieldName(fieldName: string) {
        this.uniqueFieldName = fieldName;
    }
}
