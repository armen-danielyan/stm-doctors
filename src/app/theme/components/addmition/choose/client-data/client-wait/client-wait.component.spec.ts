import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWaitComponent } from './client-wait.component';

describe('ClientWaitComponent', () => {
  let component: ClientWaitComponent;
  let fixture: ComponentFixture<ClientWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
