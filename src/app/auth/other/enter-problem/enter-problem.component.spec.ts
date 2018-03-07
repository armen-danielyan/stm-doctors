import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterProblemComponent } from './enter-problem.component';

describe('EnterProblemComponent', () => {
  let component: EnterProblemComponent;
  let fixture: ComponentFixture<EnterProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
