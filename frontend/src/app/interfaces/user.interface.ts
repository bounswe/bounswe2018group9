import { Object } from './object.interface';

export interface User extends Object {
  name?: string;
  email?: string;
  profileImage?: string;
}
