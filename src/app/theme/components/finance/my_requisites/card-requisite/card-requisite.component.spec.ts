import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRequisiteComponent } from './card-requisite.component';

describe('CardRequisiteComponent', () => {
  let component: CardRequisiteComponent;
  let fixture: ComponentFixture<CardRequisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRequisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
