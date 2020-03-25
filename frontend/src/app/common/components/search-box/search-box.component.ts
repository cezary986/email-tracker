import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() placeholder = '';
  @Output() queryChange: EventEmitter<string> = new EventEmitter();
  public query: string = null;

  constructor() { }

  ngOnInit() {
  }

  public onClearButtonClick() {
    if (this.query !== null && this.query.length > 0) {
      this.query = '';
      this.queryChange.emit('');
    }
  }
}
