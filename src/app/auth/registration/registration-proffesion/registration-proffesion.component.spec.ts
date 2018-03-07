import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProffesionComponent } from './registration-proffesion.component';

describe('RegistrationProffesionComponent', () => {
  let component: RegistrationProffesionComponent;
  let fixture: ComponentFixture<RegistrationProffesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationProffesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationProffesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
