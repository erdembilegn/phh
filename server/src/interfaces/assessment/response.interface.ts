import { GenericError } from '../main.interface';

export interface ResponseCreateAssessment {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetAssessment {
  error?: GenericError;
  data?: {
    id: string;
    assessmentName: string;
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
    gamifications: {
      gamificationId: string;
      gamificationStartDate: Date;
      gamificationEndDate: Date;
    }[];
  }[];
}

export interface ResponseUpdateAssessment {
  error?: GenericError;
  data?: {
    id: string;
    assessmentName: string;
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
    gamifications: {
      gamificationId: string;
      gamificationStartDate: Date;
      gamificationEndDate: Date;
    }[];
  };
}