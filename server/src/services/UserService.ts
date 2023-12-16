import { PrismaClient } from '@prisma/client';
import {
  ResponseCreateUser,
  ResponseGetAllUser,
  ResponseGetUser,
  ResponseGetUserById,
  ResponseGetUserByRoleGroup,
  ResponseUpdateUser,
} from '../interfaces/user/response.interface';
import { RestCreateUser, RestDeleteUser, RestGetUser, RestGetUserByRoleGroup, RestUpdateUser } from '../interfaces/user/rest.interface';
import { encryptPassword } from '../utils';
import { clearConfigCache } from 'prettier';

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
          groupId: req.groupId ?? null,
          role: req.role,
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
              groupId: user.groupId ?? null,
              role: user.role,
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
          groupId: user.groupId ?? null,
          role: user.role,
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
  public async getUserByRoleGroup(req : RestGetUserByRoleGroup): Promise<ResponseGetUserByRoleGroup> {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: req.role,
          groupId : req.groupId,
        },
      });
      const data = users.map((user) => ({
        id: user.id,
        firstName : user.firstName,
        lastName : user.lastName,
        groupId : user.groupId ?? null,
        email : user.email,
        role : user.role,
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
  public async getAllUser(): Promise<ResponseGetAllUser> {
    try {
      const user = await prisma.user.findMany();
      return {
        data: user,
      };
      console.log('user', user)
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }

  public async updateUser(req: RestUpdateUser): Promise<ResponseUpdateUser> {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          id: req.id
        },
      });

      if (!existingUser) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          firstName : req.firstName ?? existingUser.firstName,
          lastName : req.lastName ?? existingUser.lastName,
          email : req.email ?? existingUser.email,
          password : req.password ?? existingUser.password,
          role : req.role ?? existingUser.role,
          groupId : req.groupId ?? existingUser.groupId,
        }
      });

      const data = {
        id: existingUser.id,
        firstName : existingUser.firstName,
        lastName : existingUser.lastName,
        email : existingUser.email,
        password : existingUser.password,
        groupId : existingUser.groupId,
        role : existingUser.role,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      };

      return {
        data,
      };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }

  public async deleteUser(req: RestDeleteUser) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          id: req.id,
        },
      });

      if (!existingUser) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      const deletedUser = await prisma.user.delete({
        where: {
          id: req.id,
        },
      });

      return {
        data: {
          message: 'User deleted successfully',
          deletedUser,
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
