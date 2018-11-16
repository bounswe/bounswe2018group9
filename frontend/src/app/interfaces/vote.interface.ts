import { Object } from './object.interface';
import { User } from './user.interface';

export interface Vote extends Object {
  user?: string | User;
  type?: number;
}

export interface Votes extends Object {
  count?: { [type: number]: number };
  votes?: [Vote]
}
