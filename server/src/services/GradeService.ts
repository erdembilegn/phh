import { PrismaClient } from '@prisma/client';
import { ResponseCreateGrade, ResponseGetGrade } from '../interfaces/grade/response.interface';
import { RestCreateGrade } from '../interfaces/grade/rest.interface';

const prisma = new PrismaClient();

export class GradeService {
  public async createGrade(req: RestCreateGrade): Promise<ResponseCreateGrade> {
    try {

      let data = req.user.map(async (grade) => {
        return await prisma.grade.create({
          data: {
            userId: grade.userId,
            assessmentId: req.assessmentId,
            gamificationId: req.assessmentId,
            gradeNumber: grade.gradeNumber,
            createdUser: req.createdUser,
          }
        })
      })


      const ids = await Promise.all(data.map((ids) => {
        return ids.then((res) => {
          return res.id;
        });
      }));

      return {
        data: {
          id: ids
        }
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
