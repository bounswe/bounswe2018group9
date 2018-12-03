import { Object } from './object.interface';
import {Datetime} from '@ionic/angular';

export interface User extends Object {
  name: string;
  email: string;
  details: {
    birth?: Datetime;
    nationality?: string;
    city?: string;
  };
  followers? : string[];
  following? : string[];
  interests? : string[];
}
