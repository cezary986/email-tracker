import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldWithActionComponent } from './form-field-with-action.component';

describe('FormFieldWithActionComponent', () => {
  let component: FormFieldWithActionComponent;
  let fixture: ComponentFixture<FormFieldWithActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldWithActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
