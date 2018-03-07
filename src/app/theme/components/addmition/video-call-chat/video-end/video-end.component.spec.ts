import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEndComponent } from './video-end.component';

describe('VideoEndComponent', () => {
  let component: VideoEndComponent;
  let fixture: ComponentFixture<VideoEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
