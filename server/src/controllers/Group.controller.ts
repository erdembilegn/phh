import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { ResponseCreateGroup, ResponseGetAllGroup, ResponseGetGroup, ResponseUpdateGroup } from '../interfaces/group/response.interface';
import { RestCreateGroup, RestDeleteGroup, RestUpdateGroup } from '../interfaces/group/rest.interface';
import { GroupService } from '../services/GroupService';
import { request } from 'express';

@Route('/group')
export class GroupController extends Controller {
  @Post('/create')
  @Tags('CreateGroup')
  public async createGroup(@Body() req: RestCreateGroup): Promise<ResponseCreateGroup> {
    const data = await new GroupService().createGroup(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(201);
    return data;
  }

  @Get('/get/{groupId}')
  @Tags('GetGroup')
  public async getGroup(@Path() groupId: string): Promise<ResponseGetGroup> {
    const data = await new GroupService().getGroup(groupId);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Get('/getAllGroup')
  @Tags('GetAllGroups')
  public async getAllGroups(): Promise<ResponseGetAllGroup> {
    const data = await new GroupService().getAllGroups();
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Put('/update')
  @Tags('UpdateGroup')
  public async updateGroup(@Body() req: RestUpdateGroup): Promise<ResponseUpdateGroup> {
    const data = await new GroupService().updateGroup(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Delete('/delete')
  @Tags('DeleteGroup')
  public async deleteGroup(@Body() req: RestDeleteGroup){
    const data = await new GroupService().deleteGroup(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
