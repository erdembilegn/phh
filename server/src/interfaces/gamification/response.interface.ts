// import { GamificationAward } from '@prisma/client';
import { GenericError } from '../main.interface';

export interface ResponseCreateGamification {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetGamification {
  error?: GenericError;
  data?: {
    id: string;
    gamificationName: string;
    gamificationStartDate: Date;
    gamificationEndDate: Date;
    groupId: string;
    awards: {
      awardId: string;
      awardMinPercentage: number;
      awardMaxPercentage: number;
    }[];
    assessments: {
      assessmentId: string;
      assessmentPercentage: number;
    }[];
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
