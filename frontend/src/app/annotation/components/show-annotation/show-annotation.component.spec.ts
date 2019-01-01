import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnnotationComponent } from './show-annotation.component';

describe('ShowAnnotationComponent', () => {
  let component: ShowAnnotationComponent;
  let fixture: ComponentFixture<ShowAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
