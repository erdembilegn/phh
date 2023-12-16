import { PrismaClient } from '@prisma/client';
import { RestCreateGroup, RestDeleteGroup, RestUpdateGroup } from '../interfaces/group/rest.interface';
import {
  ResponseCreateGroup,
  ResponseGetGroup,
  ResponseGetAllGroup,
  ResponseUpdateGroup,
} from '../interfaces/group/response.interface';

const prisma = new PrismaClient();

export class GroupService {
  async createGroup(data: RestCreateGroup): Promise<ResponseCreateGroup> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: data.createdUser
        },
        select: {
          role: true,
        },
      });

      if (user?.role !== 'Admin' && user?.role !== 'admin'){
        throw new Error("Only admin can create group");
      }
      const createdGroup = await prisma.group.create({
        data: {
          name: data.name,
          createdUser: data.createdUser,
        },
      });

      return {
        data: {
          id: createdGroup.id,
        },
      };
    } catch (error) {
      // Handle error appropriately
      return {
        error: {
          message: (error as Error).message,
        },
      };
    }
  }

  async getGroup(groupId: string): Promise<ResponseGetGroup> {
    try {
      console.log('called group by id')
      const group = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
        include: {
          users: {
            select: {
              id: true,
            },
          },
          gamifications: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!group) {
        return {
          error: {
            message: 'Group not found',
          },
        };
      }

      const data = {
        id: group.id,
        name: group.name,
        users: group.users.map((user) => ({
          userId: user.id,
        })),
        gamifications: group.gamifications.map((gamification) => ({
          gamificationId: gamification.id,
        })),
        createdUser: group.createdUser,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
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

  async getAllGroups(): Promise<ResponseGetAllGroup> {
    try {
      console.log('called all group')
      const groups = await prisma.group.findMany({
        include: {
          users: {
            select: {
              id: true,
            },
          },
          gamifications: {
            select: {
              id: true,
            },
          },
        },
      });

      const data = groups.map((group) => ({
        id: group.id,
        name: group.name,
        users: group.users.map((user) => ({
          userId: user.id,
        })),
        gamifications: group.gamifications.map((gamification) => ({
          gamificationId: gamification.id,
        })),
        createdUser: group.createdUser,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
      }));

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
  public async updateGroup(req: RestUpdateGroup): Promise<ResponseUpdateGroup> {
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
        throw new Error("Only admin can update group");
      }
      const existingGroup = await prisma.group.findFirst({
        where: {
          id: req.id
        },
      });

      if (!existingGroup) {
        return {
          error: {
            message: 'Group not found',
          },
        };
      }

      const updatedGroup = await prisma.group.update({
        where: {
          id: existingGroup.id,
        },
        data: {
          name: req.name ?? existingGroup.name,
        },
        include: {
          users: {
            select: {
              id: true,
            },
          },
          gamifications: {
            select: {
              id: true,
            },
          },
        },
      });

      const data = {
        id: updatedGroup.id,
        name: updatedGroup.name,
        users: updatedGroup.users.map((user) => ({
          userId: user.id,
        })),
        gamifications: updatedGroup.gamifications.map((gamification) => ({
          gamificationId: gamification.id,
        })),
        createdUser: updatedGroup.createdUser,
        createdAt: updatedGroup.createdAt,
        updatedAt: updatedGroup.updatedAt,
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

  public async deleteGroup(req: RestDeleteGroup) {
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
        throw new Error("Only admin can delete group");
      }
      const existingGroup = await prisma.group.findFirst({
        where: {
          id: req.id,
        },
      });

      if (!existingGroup) {
        return {
          error: {
            message: 'Group not found',
          },
        };
      }
      const deletedGroup = await prisma.group.delete({
        where: {
          id: req.id,
        },
      });

      return {
        data: {
          message: 'Group deleted successfully',
          deletedGroup,
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
