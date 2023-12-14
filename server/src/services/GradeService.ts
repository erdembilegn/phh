import { PrismaClient } from '@prisma/client';
import { ResponseCreateGrade, ResponseGetGrade } from '../interfaces/grade/response.interface';
import { RestCreateGrade } from '../interfaces/grade/rest.interface';

const prisma = new PrismaClient();

export class GradeService {
  public async createGrade(req: RestCreateGrade[]): Promise<ResponseCreateGrade[]> {
    try {
      const createdGrades: ResponseCreateGrade[] = [];

    for (const grade of req) {
      const data = await prisma.grade.create({
        data: {
          userId: grade.userId,
          assessmentId: grade.assessmentId,
          gamificationId: grade.gamificationId,
          gradeNumber: grade.gradeNumber,
        },
      });

      createdGrades.push({
        data: {
          id: data.id,
        },
      });
    }

    return createdGrades;
  } catch (error) {
    return req.map(() => ({
      error: {
        message: (error as Error).message,
      },
    }));
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
