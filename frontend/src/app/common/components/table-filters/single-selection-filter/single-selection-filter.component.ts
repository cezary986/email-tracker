import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FilterHelpers } from '../filter-helper';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-single-selection-filter',
  templateUrl: './single-selection-filter.component.html',
  styleUrls: ['./single-selection-filter.component.scss']
})
export class SingleSelectionFilterComponent {

  @Input() label: string;
  // tslint:disable-next-line: variable-name
  @Input() _options: any[];
  @Input() set options(value: any[]) {
    this._options = value;
    if (value !== null && this._allowAny) {
      this._allowAny = true;
      this.addAllowAnyOption();
      if (this.value === undefined || this.value === null) {
        this.value = this._options[0];
        this.formField.value = this.value;
        this.formField.valueChange.emit(this.value);
      }
    }
  }
  @Input() displayField: string;
  @Input() urlKey: string;
  // tslint:disable-next-line: variable-name
  private _allowAny = false;
  private anyOptionTranslateKey;
  // Czy ma być dostępna opcja wybrania dowolnej wartości dla filtru
  @Input() set allowAny(translateKey: string) {
    if (translateKey !== undefined && !this._allowAny) {
      this.anyOptionTranslateKey = translateKey;
      this._allowAny = true;
      this.addAllowAnyOption();
    } else if (this._allowAny) {
      this._allowAny = false;
      this.removeAllowAnyOption();
    }
  }
  @Input() set initialValue(value: any) {
    if (this.value === null) {
      this.value = value;
      this.formField.value = value;
      this.formField.valueChange.emit(value);
    }
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('formField', null) formField: MatSelect;

  public value: any = null;

  constructor(
    private filterHelpers: FilterHelpers,
    private translate: TranslateService
  ) { }

  public onSelectClick() {
    this.formField._elementRef.nativeElement.click();
  }

  public setFilter(value: any) {
    if (this.urlKey !== undefined && this.urlKey !== null) {
      this.filterHelpers.setFilter(value, this.urlKey, value[this.displayField]);
    }
  }

  public onSelectionChange(event) {
    this.value = event.value;
    this.valueChange.emit(event.value.isAny ? null : event.value);
    this.setFilter(event.value);
  }

  private addAllowAnyOption() {
    if (this._options !== undefined && this._options !== null) {
      const allowAnyElement = {};
      allowAnyElement[this.displayField] = this.translate.instant(this.anyOptionTranslateKey);
      (allowAnyElement as any).isAny = true;
      this._options.unshift(allowAnyElement);
    }
  }

  private removeAllowAnyOption() {
    if (this._options !== undefined && this._options !== null) {
      this._options.splice(0, 1);
    }
  }
}
