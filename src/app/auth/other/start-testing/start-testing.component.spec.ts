import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTestingComponent } from './start-testing.component';

describe('StartTestingComponent', () => {
  let component: StartTestingComponent;
  let fixture: ComponentFixture<StartTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
