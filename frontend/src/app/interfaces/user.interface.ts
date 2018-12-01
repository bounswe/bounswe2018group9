import { Object } from './object.interface';
import {Datetime} from '@ionic/angular';

export interface User extends Object {
  email: string;
  userDetails: {
    name: string;
    birth?: Datetime;
    nationality?: string;
    city?: string;
  };
  followers? : User[];
  following? : User[];
  interests? : string[];
}
