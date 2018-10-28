import { Object } from './object.interface';

export interface User extends Object {
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}
