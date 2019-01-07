import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {Event} from "../../../interfaces";

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataService<Event> = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
