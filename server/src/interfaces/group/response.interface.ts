import { GenericError } from '../main.interface';

export interface ResponseCreateGroup {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetGroup {
  error?: GenericError;
  data?: {
    id: string;
    name: string;
    users: {
      userId: string;
    }[];
    gamifications: {
      gamificationId: string;
    }[];
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ResponseGetAllGroup {
  error?: GenericError;
  data?: {
    id: string;
    name: string;
    users: {
      userId: string;
    }[];
    gamifications: {
      gamificationId: string;
    }[];
    createdUser: string,
    createdAt: Date,
    updatedAt: Date,
  }[];
}

export interface ResponseUpdateGroup {
  error?: GenericError;
  data?: {
    id: string;
    name: string;
    users: {
      userId: string;
    }[];
    gamifications: {
      gamificationId: string;
    }[];
    createdUser: string,
    createdAt: Date,
    updatedAt: Date,
  };
}
