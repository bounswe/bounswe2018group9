import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordPage } from './change-password.page';

describe('ChangePasswordPage', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
