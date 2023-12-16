import { PrismaClient } from '@prisma/client';
import { ResponseCreateGrade, ResponseGetGrade } from '../interfaces/grade/response.interface';
import { RestCreateGrade } from '../interfaces/grade/rest.interface';

const prisma = new PrismaClient();

export class GradeService {
  public async createGrade(req: RestCreateGrade): Promise<ResponseCreateGrade> {
    try {
      let createdIds = await Promise.all(
        req.user.map(async (grade) => {
          let createdGrade = await prisma.grade.create({
            data: {
              userId: grade.userId,
              assessmentId: req.assessmentId,
              gamificationId: req.assessmentId,
              gradeNumber: grade.gradeNumber,
              createdUser: req.createdUser,
            },
          });
          return createdGrade.id;
        }),
      );

      return {
        data: {
          id: createdIds,
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

  public async getGrade(): Promise<ResponseGetGrade> {
    try {
      const grade = await prisma.grade.findMany();
      return {
        data: grade,
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
