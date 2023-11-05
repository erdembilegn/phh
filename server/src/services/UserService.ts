import { PrismaClient } from '@prisma/client';
import {
  ResponseCreateUser,
  ResponseGetUser,
  ResponseGetUserById,
} from '../interfaces/user/response.interface';
import { RestCreateUser, RestGetUser } from '../interfaces/user/rest.interface';
import { encryptPassword } from '../utils';

const prisma = new PrismaClient();

export class UserService {
  public async CreateUser(req: RestCreateUser): Promise<ResponseCreateUser> {
    try {
      const password = encryptPassword(req.password);
      const user = await prisma.user.create({
        data: {
          email: req.email,
          firstName: req.firstName,
          lastName: req.lastName,
          password,
          groupId: req.groupId,
        },
      });

      if (!user)
        return {
          error: {
            message: 'User not created',
          },
        };

      return { data: { id: user.id } };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }
  public async GetUser(req: RestGetUser): Promise<ResponseGetUser> {
    try {
      const password = encryptPassword(req.password);
      const user = await prisma.user.findUnique({
        where: {
          email: req.email,
          password,
        },
      });
      if (!user)
        return {
          error: {
            message: 'User not found',
          },
        };
      const verified = password === user.password;
      return verified
        ? {
            data: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              groupId: user.groupId,
            },
          }
        : {
            error: {
              message: 'Password is incorrect',
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
  public async getUserById(userId: string): Promise<ResponseGetUserById> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      return {
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          groupId: user.groupId,
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
