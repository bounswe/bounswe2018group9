import { Object } from './object.interface';
import { User } from './user.interface';
import { Media } from './media.interface';
import { Votes } from './vote.interface';
import { Comments } from './comment.interface';
import { Attendances } from './attendance.interface';
import { Location } from './location.interface';

export interface Event extends Object {
  creator?: string | User;
  title?: string;
  description?: string;
  artists?: [string];
  tags?: [string];
  media?: Media
  date?: number;
  location?: Location;
  price?: {
    amount: number;
    currency: string;
  };
  votes?: Votes;
  comments?: Comments;
  attendances?: Attendances;
}
