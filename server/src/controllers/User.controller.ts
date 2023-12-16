import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import {
  ResponseCreateUser,
  ResponseGetAllUser,
  ResponseGetUser,
  ResponseGetUserById,
  ResponseGetUserByRoleGroup,
  ResponseUpdateUser,
} from '../interfaces/user/response.interface';
import {
  RestCreateUser,
  RestDeleteUser,
  RestGetUser,
  RestGetUserByRoleGroup,
  RestUpdateUser,
} from '../interfaces/user/rest.interface';
import { UserService } from '../services';

@Route('/user')
export class UserController extends Controller {
  @Post('/create')
  @Tags('CreateUser')
  public async createUser(@Body() req: RestCreateUser): Promise<ResponseCreateUser> {
    const userId = new UserService().CreateUser(req);
    this.setStatus(201);
    if ((await userId).error) {
      this.setStatus(404);
      return userId;
    }
    return userId;
  }

  @Post('/getUser')
  @Tags('GetUser')
  public async getUser(
    @Body() req: RestGetUser,
    @Request() request: express.Request,
  ): Promise<ResponseGetUser> {
    const res = request.res;
    const user = new UserService().GetUser(req);
    this.setStatus(200);
    if ((await user).error) {
      this.setStatus(404);
      return user;
    }
    const userData = (await user).data;
    const { id } = userData || {};
    const token = await jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    res?.cookie('token', token, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 3600000,
    });
    return user;
  }

  @Security('jwt')
  @Get('/getUserById/{userId}')
  @Tags('GetUserById')
  public async getUserById(@Path() userId: string): Promise<ResponseGetUserById> {
    const response = new UserService().getUserById(userId);
    this.setStatus(200);
    if ((await response).error) {
      this.setStatus(404);
      return response;
    }
    return response;
  }

  @Post('/getUserbyRoleGroupId')
  @Tags('GetUserByRoleAndGroupId')
  public async getUserByRoleGroup(
    @Body() req: RestGetUserByRoleGroup,
  ): Promise<ResponseGetUserByRoleGroup> {
    this.setStatus(200);
    const user = await new UserService().getUserByRoleGroup(req);
    if ((await user).error) {
      this.setStatus(404);
      return user;
    }

    return user;
  }

  @Get('/get')
  @Tags('GetAllUser')
  public async getAllUser(): Promise<ResponseGetAllUser> {
    const data = await new UserService().getAllUser();
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }

  @Put('/update')
  @Tags('UpdateUser')
  public async updateUser(@Body() req: RestUpdateUser): Promise<ResponseUpdateUser> {
    const data = await new UserService().updateUser(req);
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }

  @Delete('/delete')
  @Tags('DeleteUser')
  public async deleteUser(@Body() req: RestDeleteUser) {
    const data = await new UserService().deleteUser(req);
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }
}
