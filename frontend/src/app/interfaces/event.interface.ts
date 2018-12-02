import { Object } from './object.interface';
import {User} from "./user.interface";
import {Comment} from "./comment.interface";
import {LocationConstruct} from "./location.interface";
import {Attendance} from "./attendance.interface";
import {Vote} from "./vote.interface";

export interface Event extends Object {
  name: string;
  description: string;
  price: {amount: number, currency: string};
  date: Date;
  duration: {length: number, unit: string};
  created?: Date;
  creator: User;
  attendance: Array<Attendance>;
  vote?: Vote;
  comments?: Array<Comment>;
  artists?: Array<string>;
  tags: Array<String>;
  locationConstruct: LocationConstruct;
  medias: Array<String>;
}
