import { Object } from './object.interface';
import { User } from './user.interface';
import { Event } from './event.interface';
import { Media } from './media.interface';
import { Votes } from './vote.interface';

export interface Comment extends Object {
  author: string | User;
  parentId?: null | string | Comment; // Object ID
  body: string;
  created?: Date; // Added in backend
}

export interface Comments extends Object {
  count?: number;
  comments?: [Comment];
}
