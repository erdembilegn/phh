import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, Tags } from 'tsoa';
import {
  ResponseCreateUser,
  ResponseGetUser,
  ResponseGetUserById,
  ResponseGetUserByRoleGroup,
  ResponseGetAllUser,
  ResponseUpdateUser,
} from '../interfaces/user/response.interface';
import { RestCreateUser, RestDeleteUser, RestGetUser, RestGetUserByRoleGroup, RestUpdateUser } from '../interfaces/user/rest.interface';
import { UserService } from '../services/UserService';

@Route('/user')
export class UserController extends Controller {
  @Post('/create')
  @Tags('CreateUser')
  public async createUser(@Body() req: RestCreateUser): Promise<ResponseCreateUser> {
    const userId = new UserService().CreateUser(req);
    if ((await userId).error) {
      this.setStatus(404);
      return userId;
    }
    this.setStatus(201);
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
    this.setStatus(200);
    return user;
  }

  @Security('jwt')
  @Get('/getUserById/{userId}')
  @Tags('GetUserById')
  public async getUserById(@Path() userId: string): Promise<ResponseGetUserById> {
    const response = new UserService().getUserById(userId);
    if ((await response).error) {
      this.setStatus(404);
      return response;
    }
    this.setStatus(200);
    return response;
  }

  @Post('/getUserbyRoleGroupId')
  @Tags('GetUserByRoleAndGroupId')
  public async getUserByRoleGroup(@Body() req : RestGetUserByRoleGroup): Promise<ResponseGetUserByRoleGroup> {
  const user = await new UserService().getUserByRoleGroup(req);
  if ((await user).error) {
    this.setStatus(404);
    return user;
  }

  this.setStatus(200);
  return user;
  }

  @Get('/get')
  @Tags('GetAllUser')
  public async getAllUser(): Promise<ResponseGetAllUser> {
    const data = await new UserService().getAllUser();
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Put('/update')
  @Tags('UpdateUser')
  public async updateUser(@Body() req: RestUpdateUser): Promise<ResponseUpdateUser> {
    const data = await new UserService().updateUser(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Delete('/delete')
  @Tags('DeleteUser')
  public async deleteUser(@Body() req: RestDeleteUser){
    const data = await new UserService().deleteUser(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
