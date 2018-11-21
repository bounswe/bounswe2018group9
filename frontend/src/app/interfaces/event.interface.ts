import { Object } from './object.interface';
import {User} from "./user.interface";
import {Comment} from "./comment.interface";
import {LocationConstruct} from "./location.interface";

export interface Event extends Object {
  name: string;
  description: string;
  price?: {amount: number, currency: string};
  date: Date;
  duration?: {length: number, unit: string};
  created: Date;
  creator: User;
  attendance: {user: User, attendanceType: number};
  vote: {upvoteCount: number,
        downvoteCount: number,
        votes: {user: User, voteType: number}};
  comments: Array<Comment>;
  artists: Array<string>;
  locationConstruct: LocationConstruct;
  medias: Array<String>;
}
