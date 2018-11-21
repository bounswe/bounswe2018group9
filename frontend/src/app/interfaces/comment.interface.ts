import {User} from "./user.interface";

export interface Comment{
  author: User;
  parentId: string;
  body: string;
  created: Date;
}
