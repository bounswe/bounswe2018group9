import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditPage } from './event-edit.page';

describe('EventEditPage', () => {
  let component: EventEditPage;
  let fixture: ComponentFixture<EventEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
