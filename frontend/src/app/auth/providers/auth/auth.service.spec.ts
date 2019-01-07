import { TestBed } from '@angular/core/testing';

import { AuthModule } from '../../auth.module';

import { User } from '../../../interfaces';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AuthModule ]
  }));

  beforeEach(() => {
    service = TestBed.get(AuthService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
    let user = {
      name: 'Test Test',
      email: 'test@mail.com',
      password: 'test-test'
    };

    service.register(user).subscribe(result => {
      expect(true).toBeTruthy();
    }, error => {
      expect(false).toBeTruthy();
    });
  });

  it('should sign user with correct email-password combination', () => {
    const user = {
      email: 'test@email.com',
      password: 'test-test'
    };

    service.login(user).subscribe(result => {
      expect(true).toBeTruthy();
    }, error => {
      expect(false).toBeTruthy();
    });
  });

  it('should logout user', () => {
    service.logout().subscribe(result => {
      expect(true).toBeTruthy();
    }, error => {
      expect(false).toBeTruthy();
    });
  });

  it('should not sign user with incorrect email-password combination', () => {
    const user = {
      email: 'test',
      password: 'test---test'
    };

    service.login(user).subscribe(result => {
      console.log('WTF?');
      console.log(result);
      expect(false).toBeTruthy();
    }, error => {
      expect(true).toBeTruthy();
    });
  });

  afterAll(() => {
    service.deleteUser().subscribe(deleted => {}, error => {});
  });
});
