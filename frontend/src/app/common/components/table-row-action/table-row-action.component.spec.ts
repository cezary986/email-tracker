import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowActionComponent } from './table-row-action.component';

describe('TableRowActionComponent', () => {
  let component: TableRowActionComponent;
  let fixture: ComponentFixture<TableRowActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
