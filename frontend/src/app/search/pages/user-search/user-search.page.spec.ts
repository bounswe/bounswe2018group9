import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchPage } from './user-search.page';

describe('UserSearchPage', () => {
  let component: UserSearchPage;
  let fixture: ComponentFixture<UserSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
