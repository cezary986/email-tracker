import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowSelectComponent } from './table-row-select.component';

describe('TableRowSelectComponent', () => {
  let component: TableRowSelectComponent;
  let fixture: ComponentFixture<TableRowSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
