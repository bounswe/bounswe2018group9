import { Object } from './object.interface';
import {Datetime} from '@ionic/angular';
import {Event} from "./event.interface";

export interface User extends Object {
  name?: string;
  email?: string;
  images?: {
    avatar?: string;
    cover?: string;
  }
  details: {
    birth?: Datetime;
    nationality?: string;
    city?: string;
  };
  followers? : string[];
  following? : string[];
  interests? : string[];
  willAttendEvents?: Event[],
  mayAttendEvents?: Event[],
  willNotAttendEvents?: Event[]
}
