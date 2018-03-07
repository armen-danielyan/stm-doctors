import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFinanceComponent } from './history-finance.component';

describe('HistoryFinanceComponent', () => {
  let component: HistoryFinanceComponent;
  let fixture: ComponentFixture<HistoryFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
