import { Object } from './object.interface';
import {User} from "./user.interface";

export interface Event extends Object {
    name:string;
    description: string;
    user: User;
    mainImage: string;
}
