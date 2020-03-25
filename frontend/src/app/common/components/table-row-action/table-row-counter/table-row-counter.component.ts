import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-row-counter',
  templateUrl: './table-row-counter.component.html',
  styleUrls: ['./table-row-counter.component.scss']
})
export class TableRowCounterComponent implements OnInit {

  @Input() initialValue: number;
  @Input() max = 100000000;
  @Input() min = -100000000;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  public value: number;

  ngOnInit(): void {
    this.value = this.initialValue !== undefined ? this.initialValue : this.min;
  }

  public increment() {
    this.value++;
    this.valueChange.emit(this.value);
  }

  public decrement() {
    this.value--;
    this.valueChange.emit(this.value);
  }

  public validate() {
    if (this.value < this.min) {
      this.value = this.min;
    }
    if (this.value > this.max) {
      this.value = this.max;
    }
  }
}
