export interface User {
    _id: string,
    name: string,
    username: string,
    friends?: User[];
}