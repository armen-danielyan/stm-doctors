import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTestingComponent } from './call-testing.component';

describe('CallTestingComponent', () => {
  let component: CallTestingComponent;
  let fixture: ComponentFixture<CallTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
