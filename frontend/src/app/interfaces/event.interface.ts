import { Object } from './object.interface';
import { User } from './user.interface';
import { Comment } from './comment.interface';
import { Location } from './location.interface';
import { Attendance } from './attendance.interface';
import { Vote } from './vote.interface';
import { Media } from './media.interface';

export interface Event extends Object {
  name: string;
  description: string;
  price: {amount: number, currency: string};
  date: Date;
  duration: {length: number, unit: string};
  created?: Date;
  creator: string | User;
  attendance: Array<Attendance>;
  vote?: Vote;
  comments?: Array<Comment>;
  artists?: Array<string>;
  tags: Array<String>;
  location: Location;
  media: Array<Media>;
}
