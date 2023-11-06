import { GenericError } from '../main.interface';

export interface ResponseCreateAward {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetAward {
  error?: GenericError;
  data?: {
    id: string;
    name: string;
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
  }[];
}
