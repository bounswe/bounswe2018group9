import { Object } from './object.interface';
import { User } from './user.interface';

export interface Media extends Object {
  creator?: string | User;
  type?: number;
  source?: string;
  file?: File | Blob;
}
