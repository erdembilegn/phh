// import { GamificationAward } from '@prisma/client';
import { GenericError } from '../main.interface';

export interface ResponseCreateGrade {
  error?: GenericError;
  data?: {
    id: string[];
  };
}

export interface ResponseGetGrade {
  error?: GenericError;
  data?: {
    id: string;
    userId: string,
    gradeNumber: number,
    assessmentId: string,
    gamificationId: string,
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
