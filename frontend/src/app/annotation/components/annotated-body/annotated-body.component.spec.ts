import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatedBodyComponent } from './annotated-body.component';

describe('AnnotatedBodyComponent', () => {
  let component: AnnotatedBodyComponent;
  let fixture: ComponentFixture<AnnotatedBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatedBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatedBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
