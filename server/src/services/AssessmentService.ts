import { PrismaClient } from '@prisma/client';
import { ResponseCreateAssessment, ResponseGetAssessment, ResponseUpdateAssessment } from '../interfaces/assessment/response.interface';
import { RestCreateAssessment, RestDeleteAssessment, RestUpdateAssessment } from '../interfaces/assessment/rest.interface';

const prisma = new PrismaClient();

export class AssessmentService {
  public async createAssessment(req: RestCreateAssessment): Promise<ResponseCreateAssessment> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.createdUser
        },
        select: {
          role: true,
        },
      });

      if (user?.role !== 'Admin' && user?.role !== 'admin') {
        throw new Error("Only admin can create assessment");
      }

      const data = await prisma.assessment.create({
        data: {
          assessmentName: req.assessmentName,
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

  public async getAssessment(): Promise<ResponseGetAssessment> {
    try {
      const assessments = await prisma.assessment.findMany(
        {
          include: {
            gamifications: {
              include: {
                gamification: true,
              }
            }
          }
        }
      );
      const data = assessments.map((assessment) => ({
        id: assessment.id,
        assessmentName: assessment.assessmentName,
        gamifications: assessment.gamifications.map((gam) => ({
          gamificationId: gam.gamification.id,
          gamificationStartDate: gam.gamification.gamificationStartDate,
          gamificationEndDate: gam.gamification.gamificationEndDate,
        })),
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        createdUser: assessment.createdUser,
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
  public async updateAssessment(req: RestUpdateAssessment): Promise<ResponseUpdateAssessment> {
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
        throw new Error("Only admin can update assessment");
      }
      const existingAssessment = await prisma.assessment.findFirst({
        where: {
          id: req.id
        },
      });

      if (!existingAssessment) {
        return {
          error: {
            message: 'Assessment not found',
          },
        };
      }

      const updatedAssessment = await prisma.assessment.update({
        where: {
          id: existingAssessment.id,
        },
        data: {
          assessmentName: req.assessmentName ?? existingAssessment.assessmentName,
        },
        include: {
          gamifications: {
            select: {
              gamification: true,
            },
          },
        },
      });

      const data = {
        id: updatedAssessment.id,
        assessmentName: updatedAssessment.assessmentName,
        gamifications: updatedAssessment.gamifications.map((gamification) => ({
          gamificationId: gamification.gamification.id,
          gamificationStartDate: gamification.gamification.gamificationStartDate,
          gamificationEndDate: gamification.gamification.gamificationEndDate,
        })),
        createdUser: updatedAssessment.createdUser,
        createdAt: updatedAssessment.createdAt,
        updatedAt: updatedAssessment.updatedAt,
      };

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

  public async deleteAssessment(req: RestDeleteAssessment) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.createdUser
        },
        select: {
          role: true,
        },
      });

      if (user?.role !== 'Admin' && user?.role !== 'admin') {
        throw new Error("Only admin can delete assessment");
      }
      const existingAssessment = await prisma.assessment.findFirst({
        where: {
          id: req.id,
        },
      });

      if (!existingAssessment) {
        return {
          error: {
            message: 'Assessment not found',
          },
        };
      }
      const deletedAssessment = await prisma.assessment.delete({
        where: {
          id: req.id,
        },
      });

      return {
        data: {
          message: 'Assessment deleted successfully',
          deletedAssessment,
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
}
