import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnathorizedUserNavigationComponent } from './unathorized-user-navigation.component';

describe('UnathorizedUserNavigationComponent', () => {
  let component: UnathorizedUserNavigationComponent;
  let fixture: ComponentFixture<UnathorizedUserNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnathorizedUserNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnathorizedUserNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
