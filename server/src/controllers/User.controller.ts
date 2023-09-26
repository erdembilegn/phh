import {Controller, Route, Get, Tags, Body, Post, Query, Queries} from 'tsoa'
import { UserService } from '../services/UserService';
import { ResponseCreateUser, ResponseGetUser } from '../interfaces/user/response.interface';
import { RestCreateUser, RestGetUser } from '../interfaces/user/rest.interface';

@Route('/user')
export class UserController extends Controller{
    @Post('/create')
    @Tags('GetAllUsers')
    public async getAllUser(@Body() req: RestCreateUser) : Promise<ResponseCreateUser> {
        return new UserService().CreateUser(req);
    }

    @Get('/get')
    @Tags('GetUser')
    public async getUserById(@Queries() req: RestGetUser) : Promise<ResponseGetUser>{
        return new UserService().GetUser(req);
    }
}