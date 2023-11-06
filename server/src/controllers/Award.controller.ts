import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { ResponseCreateAward, ResponseGetAward } from '../interfaces/award/response.interface';
import { RestCreateAward } from '../interfaces/award/rest.interface';
import { AwardService } from '../services/AwardService';

@Route('/award')
export class AwardController extends Controller {
  @Post('/create')
  @Tags('CreateAward')
  public async createAward(@Body() req: RestCreateAward): Promise<ResponseCreateAward> {
    const data = await new AwardService().createAward(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(201);
    return data;
  }

  @Get('/get')
  @Tags('GetAward')
  public async getAward(): Promise<ResponseGetAward> {
    const data = await new AwardService().getAward();
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
