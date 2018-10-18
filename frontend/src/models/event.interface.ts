import {User} from "./user.interface";

export interface Event {
    name:string;
    description: string;
    user: User;
    mainImage: string;
}
