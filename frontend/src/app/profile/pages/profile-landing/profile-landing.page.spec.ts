import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLandingPage } from './profile-landing.page';

describe('ProfileLandingPage', () => {
  let component: ProfileLandingPage;
  let fixture: ComponentFixture<ProfileLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLandingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
