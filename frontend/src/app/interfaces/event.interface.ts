import { Object } from './object.interface';
import {User} from "./user.interface";

export interface Event extends Object {
  owner?: string;
  name?: string;
  description?: string;
  artists?: string;
  date?: number;
  price?: number;
}
