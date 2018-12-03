import { Object } from './object.interface';
import { User } from './user.interface';

export interface Attendance extends Object {
  user: User;
  attendanceType: number;
}

export interface Attendances extends Object {
  count?: { [type: number]: number };
  attendances?: [Attendance]
}
