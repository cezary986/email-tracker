import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowCounterComponent } from './table-row-counter.component';

describe('TableRowCounterComponent', () => {
  let component: TableRowCounterComponent;
  let fixture: ComponentFixture<TableRowCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
