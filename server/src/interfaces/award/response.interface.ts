import { Gamification } from '@prisma/client';
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
    gamifications : {
      gamificationId : string;
      gamificationStartDate : Date;
      gamificationEndDate : Date;
    }[];
  }[];
}

export interface ResponseGetAwardById{
  error?: GenericError;
  data?: {
    id: string;
    name : string;
  };
}

export interface ResponseUpdateAward {
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
