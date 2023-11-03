import {Controller, Route, Get, Tags, Body, Post, Query, Queries} from 'tsoa'
import { AwardService } from '../services/AwardService';
import { ResponseCreateAward, ResponseGetAward } from '../interfaces/award/response.interface';
import { RestCreateAward, RestGetAward } from '../interfaces/award/rest.interface';

@Route('/award')
export class AwardController extends Controller{
    @Post('/create')
    @Tags('CreateAward')
    public async createAward(@Body() req: RestCreateAward) : Promise<ResponseCreateAward> {
        return new AwardService().CreateAward(req);
    }

    @Get('/get')
    @Tags('GetAward')
    public async getUserAwardId(@Queries() req: RestGetAward) : Promise<ResponseGetAward>{
        return new AwardService().GetAward(req);
    }
 }