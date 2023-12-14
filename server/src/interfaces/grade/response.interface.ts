// import { GamificationAward } from '@prisma/client';
import { GenericError } from '../main.interface';

export interface ResponseCreateGrade {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetGrade {
  error?: GenericError;
  data?: {
    id: string;
    userId : string,
    assessmentId : string,
    gamificationId : string,
    gradeNumber : number,
  }[];
}
