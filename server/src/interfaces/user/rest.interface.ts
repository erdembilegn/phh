export interface RestCreateUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role : string;
    groupId : string;
}

export interface RestGetUser {
    email: string;
    password: string;
}