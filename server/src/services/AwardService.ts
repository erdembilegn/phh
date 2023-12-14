import { PrismaClient } from '@prisma/client';
import { ResponseCreateAward, ResponseGetAward, ResponseGetAwardById, ResponseUpdateAward } from '../interfaces/award/response.interface';
import { RestCreateAward, RestDeleteAward, RestUpdateAward } from '../interfaces/award/rest.interface';

const prisma = new PrismaClient();

export class AwardService {
  public async createAward(req: RestCreateAward): Promise<ResponseCreateAward> {
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
        throw new Error("Only admin can create award");
      }

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
      const awards = await prisma.award.findMany(
        {
          include : {
            gamifications:{
              include : {
                gamification : true,
              }
            }
          }
        }
      );
      const data = awards.map((award) => ({
        id: award.id,
        name : award.name,
        image : award.image,
        gamifications:award.gamifications.map((gam) => ({
          gamificationId: gam.gamification.id,
          gamificationStartDate : gam.gamification.gamificationStartDate,
          gamificationEndDate : gam.gamification.gamificationEndDate,
        })),
        createdAt: award.createdAt,
        updatedAt: award.updatedAt,
        createdUser : award.createdUser,
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
  public async getAwardById(awardId: string): Promise<ResponseGetAwardById> {
    try {
      const award = await prisma.award.findUnique({
        where: {
          id: awardId,
        },
      });
  
      if (!award) {
        return {
          error: {
            message: 'Award not found',
          },
        };
      }
  
      return {
        data: {
          id : award.id,
          name: award.name,  
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
  
  public async updateAward(req: RestUpdateAward): Promise<ResponseUpdateAward> {
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
        throw new Error("Only admin can update award");
      }
      const existingAward = await prisma.award.findFirst({
        where: {
          id : req.id
        },
      });
  
      if (!existingAward) {
        return {
          error: {
            message: 'Award not found',
          },
        };
      }
  
      const updatedAward = await prisma.award.update({
        where: {
          id: existingAward.id,
        },
        data: {     
          name: req.name ?? existingAward.name, 
          image: req.image ?? existingAward.image, 
        },
      });
  
      return {
        data: [updatedAward],
      };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }

  public async deleteAward(req: RestDeleteAward) {
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
        throw new Error("Only admin can delete award");
      }
      const existingAward = await prisma.award.findFirst({
        where: {
          id: req.id,
        },
      });
  
      if (!existingAward) {
        return {
          error: {
            message: 'Award not found',
          },
        };
      }
      const deletedAward = await prisma.award.delete({
        where: {
          id: req.id,
        },
      });
  
      return {
        data: {
          message: 'Award deleted successfully',
          deletedAward,
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

