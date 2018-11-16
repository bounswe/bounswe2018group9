import { Object } from './object.interface';

export interface Location extends Object {
  name?: string;
  coordinates?: {
    lat: number;
    long: number;
  }
}
