import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent {

  public checked: boolean = null;
  @ViewChild('formField', null) formField: MatCheckbox;

  @Input() set initialValue(checked: boolean) {
    if (this.checked === null) {
      this.checked = checked;
      this.formField.checked = checked;
      this.formField.change.emit({source: null, checked});
    }
  }
  @Input() label: string;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter();
}
