import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-with-action',
  templateUrl: './form-field-with-action.component.html',
  styleUrls: ['./form-field-with-action.component.scss']
})
export class FormFieldWithActionComponent {

  public static counter = 0;

  public valid = true;
  public disabled = false;

  @Input() value: string = null;
  @Input() name: string;
  @Input() tooltip: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() readonly = false;
  @Input() required = false;
  @Input() set control(formControl: FormControl) {
    this.valid = formControl.touched ? formControl.valid : true;
    this.disabled = formControl.disabled;
    if (formControl !== undefined && formControl !== null) {
      formControl.statusChanges.subscribe((status) => {
        if (status === 'VALID') {
          this.valid = true;
        } else if (status === 'INVALID') {
          this.valid =  formControl.valid;
        } else if (status === 'DISABLED') {
          this.disabled = true;
        }
      });
    }
  }
  @Output() actionClick: EventEmitter<void> = new EventEmitter();

  public onActionClick() {
    if (!this.readonly) {
      this.actionClick.emit();
    }
  }

  nothing() {}
}
