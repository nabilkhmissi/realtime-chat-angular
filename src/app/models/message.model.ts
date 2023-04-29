import { User } from "./user.model";

export interface Message {
    roomId: string;
    sender: User,
    content: string,
    creationDate?: string
}