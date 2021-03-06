import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStep2Component } from './registration-step-2.component';

describe('RegistrationStep3Component', () => {
  let component: RegistrationStep2Component;
  let fixture: ComponentFixture<RegistrationStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
