import { GenericError } from '../main.interface';

export interface ResponseCreateUser {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetUser {
  error?: GenericError;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    groupId: string;
    role: string;
  };
}

export interface ResponseGetAllUser {
  error?: GenericError;
  data?:
    | {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      }[]
    | null;
}

export interface ResponseGetUserById {
  error?: GenericError;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    groupId: string;
    role: string;
  };
}
