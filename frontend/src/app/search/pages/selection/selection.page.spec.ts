import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPage } from './selection.page';

describe('SelectionPage', () => {
  let component: SelectionPage;
  let fixture: ComponentFixture<SelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
