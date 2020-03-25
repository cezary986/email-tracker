import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateTimePickerComponent } from './custom-datepicker.component';

describe('CustomDateTimePickerComponent', () => {
  let component: CustomDateTimePickerComponent;
  let fixture: ComponentFixture<CustomDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
