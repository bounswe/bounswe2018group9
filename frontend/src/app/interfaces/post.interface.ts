import { Event } from './event.interface';
import { Comment } from './comment.interface';

export interface Post {
  type: number;
  content: Event | Comment;
}