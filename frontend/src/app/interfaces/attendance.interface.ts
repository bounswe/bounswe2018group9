import { Object } from './object.interface';
import { User } from './user.interface';

export interface Attendance extends Object {
  user?: string | User;
  type?: number;
}

export interface Attendances extends Object {
  count?: { [type: number]: number };
  attendances?: Attendance[]
}
