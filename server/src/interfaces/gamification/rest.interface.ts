import { GamificationAward } from "@prisma/client";

export interface RestCreateGamification {
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
}

export interface RestGetGamification {
  gamificationName: string;
}
