import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchPage } from './event-search.page';

describe('EventSearchPage', () => {
  let component: EventSearchPage;
  let fixture: ComponentFixture<EventSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
