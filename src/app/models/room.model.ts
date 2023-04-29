import { Message } from "./message.model";
import { User } from "./user.model";

export interface Room {
    _id: string,
    messages: Message[];
    users: User[]
}