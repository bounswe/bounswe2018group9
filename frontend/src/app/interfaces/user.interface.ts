import { Object } from './object.interface';
import { Media } from './media.interface';

export interface User extends Object {
  name?: string;
  email?: string;
  image?: Media;
}
