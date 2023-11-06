import { PrismaClient } from '@prisma/client';
import { ResponseCreateAward, ResponseGetAward } from '../interfaces/award/response.interface';
import { RestCreateAward } from '../interfaces/award/rest.interface';

const prisma = new PrismaClient();

export class AwardService {
  public async createAward(req: RestCreateAward): Promise<ResponseCreateAward> {
    try {
      const data = await prisma.award.create({
        data: {
          name: req.name,
          image: req.image,
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

  public async getAward(): Promise<ResponseGetAward> {
    try {
      const award = await prisma.award.findMany();
      return {
        data: award,
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
