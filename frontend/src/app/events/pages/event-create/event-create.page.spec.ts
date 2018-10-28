import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatePage } from './event-create.page';

describe('EventCreatePage', () => {
  let component: EventCreatePage;
  let fixture: ComponentFixture<EventCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
