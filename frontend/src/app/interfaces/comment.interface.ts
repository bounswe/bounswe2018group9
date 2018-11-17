import { Object } from './object.interface';
import { User } from './user.interface';
import { Event } from './event.interface';
import { Media } from './media.interface';
import { Votes } from './vote.interface';

export interface Comment extends Object {
  author?: string | User;
  reference?: string | User | Event;
  parent?: null | string | Comment;
  text?: string;
  media?: Media[];
  votes?: Votes;
}

export interface Comments extends Object {
  count?: number;
  comments?: Comment[];
}
