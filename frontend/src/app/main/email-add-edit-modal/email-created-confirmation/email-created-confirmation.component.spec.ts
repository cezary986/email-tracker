import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCreatedConfirmationComponent } from './email-created-confirmation.component';

describe('EmailCreatedConfirmationComponent', () => {
  let component: EmailCreatedConfirmationComponent;
  let fixture: ComponentFixture<EmailCreatedConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCreatedConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCreatedConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
