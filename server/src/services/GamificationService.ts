import { PrismaClient } from '@prisma/client';
import { ResponseCreateGamification, ResponseGetGamification } from '../interfaces/gamification/response.interface';
import { RestCreateGamification } from '../interfaces/gamification/rest.interface';

const prisma = new PrismaClient();

export class GamificationService {
  public async createGamification(req: RestCreateGamification): Promise<ResponseCreateGamification> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.createdUser
        },
        select: {
          role: true,
        },
      });

      if (user?.role !== 'Admin' && user?.role !== 'admin'){
        throw new Error("Only admin can create gamification");
      }

      const sumPercentage = req.assessments.map((assessment) => assessment.assessmentPercentage)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if (sumPercentage > 100) throw new Error("sum must be <100");
      const data = await prisma.gamification.create({
        data: {
          gamificationName: req.gamificationName,
          gamificationStartDate: req.gamificationStartDate,
          gamificationEndDate: req.gamificationEndDate,
          groupId: req.groupId,
          awards: {
            create: req.awards.map((award) => ({
              awardId: award.awardId,
              awardMaxPercentage: award.awardMaxPercentage,
              awardMinPercentage: award.awardMinPercentage,
            }))
          },
          assessments: {
            create: req.assessments.map((assessment) => ({
              assessmentId: assessment.assessmentId,
              assessmentPercentage: assessment.assessmentPercentage,
            }))
          },
          createdUser: req.createdUser,
        },
      });
      return {
        data: {
          id: data.id,
        },
      };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }

  public async getGamification(): Promise<ResponseGetGamification> {
    try {
      const gamifications = await prisma.gamification.findMany( {
        include: {
          awards: {
            include: {
              award: true,
            },
          },
          assessments: {
            include: {
              assessment: true,
            },
          },
        },
      });
  
      const data = gamifications.map((gam) => ({
        id: gam.id,
        gamificationName: gam.gamificationName,
        gamificationStartDate: gam.gamificationStartDate,
        gamificationEndDate: gam.gamificationEndDate,
        groupId: gam.groupId,
        createdUser: gam.createdUser,
        awards: gam.awards.map((award) => ({
          awardId: award.awardId,
          awardMinPercentage: award.awardMinPercentage,
          awardMaxPercentage: award.awardMaxPercentage,
        })),
        assessments: gam.assessments.map((assessment) => ({
          assessmentId: assessment.assessmentId,
          assessmentPercentage: assessment.assessmentPercentage,
        })),
        createdAt: gam.createdAt,
        updatedAt: gam.updatedAt,
      }));
  
      return {
        data
      };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
}
