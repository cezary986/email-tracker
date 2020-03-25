import { Subject, Observable } from 'rxjs';
import { removeFromArray, addToArray } from './array-add-remove';

export function synchSelectionChanges(array: any[], change: SelectionChange<any>, uniqueFieldName: string,) {
    removeFromArray(array, change.removed, uniqueFieldName);
    addToArray(array, change.added);
}

export interface SelectionChange<T> {
    added: T[];
    removed: T[];
    source: SelectionModel<T>;
}

export class SelectionModel<T> {

    public selection: any;
    public selected: T[];
    private uniqueFieldName: string;
    public multiple = true;
    public initialSelection: T[];

    public selectionChange: Subject<SelectionChange<T>>;
    get onChange(): Observable<SelectionChange<T>> {
        return this.selectionChange as Observable<SelectionChange<T>>;
    }

    constructor(initialSelection: T[] = null, uniqueFieldName = null, multiple?: true) {
        this.uniqueFieldName = uniqueFieldName;
        this.multiple = multiple;
        if (multiple === null || multiple === undefined) {
            this.multiple = false;
        }
        this.selection = {};
        this.selected = [];
        this.selectionChange = new Subject();
    }

    public select(...elements: T[]) {
        if (!this.multiple) {
            elements = [elements[0]];
            this.clear();
        }
        for (const element of elements) {
            const key = this.getElementKey(element);
            this.selection[key] = element;
        }
        this.selected = Object.values(this.selection);
        const event: SelectionChange<T> = {
            added: elements,
            removed: [],
            source: this
        };
        this.selectionChange.next(event);
    }

    public deselect(...elements: T[]) {
        if (!this.multiple) {
            elements = [elements[0]];
        }
        for (const element of elements) {
            const key = this.getElementKey(element);
            delete this.selection[key];
        }
        const event: SelectionChange<T> = {
            added: [],
            removed: elements,
            source: this
        };
        this.selected = Object.values(this.selection);
        this.selectionChange.next(event);
    }

    public toggle(...elements: T[]) {
        if (!this.multiple) {
            elements = [elements[0]];
            this.clear();
        }
        const event: SelectionChange<T> = {
            added: [],
            removed: [],
            source: this
        };
        for (const element of elements) {
            const key = this.getElementKey(element);
            if (this.selection[key] === undefined) {
                this.selection[key] = element;
                event.added.push(element);
            } else {
                delete this.selection[key];
                event.removed.push(element);
            }
        }
        this.selected = Object.values(this.selection);
        this.selectionChange.next(event);
    }

    private getElementKey(element: T): any {
        return  this.uniqueFieldName !== null ? element[this.uniqueFieldName] : JSON.stringify(element);
    }

    public isSelected(element: T) {
        return this.selection[this.getElementKey(element)] !== undefined;
    }

    public isEmpty(): boolean {
        return Object.keys(this.selection).length === 0;
    }

    public clear() {
        const event: SelectionChange<T> = {
            added: [],
            removed: Object.values(this.selection),
            source: null
        };
        this.selection = {};
        event.source = this;
        this.selectionChange.next(event);
    }
}
