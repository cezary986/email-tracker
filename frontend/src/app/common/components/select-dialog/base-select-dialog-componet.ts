import { Inject } from '@angular/core';
import { SelectionChange } from '../../utils/table-helpers/select-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { compareArrayElementsChanges } from '../../utils/table-helpers/array-compare';

export interface BaseSelectDialogData<T> {
  alreadySelected: T[];
  multiple: boolean;
}

export class BaseSelectDialog<T> {

  protected uniqueFieldName = 'id';

  public elements: T[];
  public selectedElements: T[] = [];
  public searchQuery: string = null;
  public multiple: boolean;
  public initialSelection: T[];

  protected results: SelectionChange<T> = {
    added: [],
    removed: [],
    source: null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BaseSelectDialogData<T>,
    public dialogRef: MatDialogRef<BaseSelectDialog<T>>,
  ) {
    this.initialSelection = [...this.data.alreadySelected];
    this.multiple = data.multiple;
  }

  public onSelectionChange(selectionChange: SelectionChange<T>) {
    this.selectedElements = selectionChange.source.selected;
    this.results.source = selectionChange.source;
  }

  public onSubmit() {
    const changes: { added: T[], removed: T[] } = compareArrayElementsChanges(
      this.initialSelection,
      this.selectedElements,
      this.uniqueFieldName,
    );

    this.results.added = changes.added;
    this.results.removed = changes.removed;
    this.dialogRef.close(this.results);
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

}
