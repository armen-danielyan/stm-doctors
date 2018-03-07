import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProblemComponent } from './confirm-problem.component';

describe('ConfirmProblemComponent', () => {
  let component: ConfirmProblemComponent;
  let fixture: ComponentFixture<ConfirmProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
