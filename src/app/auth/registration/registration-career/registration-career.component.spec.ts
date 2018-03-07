import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCareerComponent } from './registration-career.component';

describe('RegistrationCareerComponent', () => {
  let component: RegistrationCareerComponent;
  let fixture: ComponentFixture<RegistrationCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
