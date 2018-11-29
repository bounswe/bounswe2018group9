import { Object } from './object.interface';
import { User } from './user.interface';

export interface Vote extends Object {
  upvoteCount: number,
  downvoteCount: number,
  votes: {user: User, voteType: number} //0=downvote 1=upvote 2=not voted
}

export interface Votes extends Object {
  count?: { [type: number]: number };
  votes?: [Vote]
}
