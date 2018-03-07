import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForWithdrawalComponent } from './requests-for-withdrawal.component';

describe('RequestsForWithdrawalComponent', () => {
  let component: RequestsForWithdrawalComponent;
  let fixture: ComponentFixture<RequestsForWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsForWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsForWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
