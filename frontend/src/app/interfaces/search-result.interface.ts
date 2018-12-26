import {Event} from './event.interface';
import {User} from "./user.interface";

export interface SearchResult{
  events: Array<Event>;
  users: Array<User>;
}
