import { Object } from './object.interface';

export interface Media extends Object {
  type?: number;
  file?: string;
}
