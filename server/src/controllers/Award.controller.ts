import { Body, Controller, Get, Post, Route, Tags, Path,  Put, Delete } from 'tsoa';
import { ResponseCreateAward, ResponseGetAward, ResponseGetAwardById, ResponseUpdateAward } from '../interfaces/award/response.interface';
import { RestCreateAward, RestDeleteAward, RestUpdateAward } from '../interfaces/award/rest.interface';
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

  @Get('/getAwardById/{awardId}')
  @Tags('GetAwardById')
  public async getAwardById(@Path() awardId: string): Promise<ResponseGetAwardById> {
    const data = await new AwardService().getAwardById(awardId);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Put('/update')
  @Tags('UpdateAward')
  public async updateAward(@Body() req: RestUpdateAward): Promise<ResponseUpdateAward> {
    const data = await new AwardService().updateAward(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Delete('/delete')
  @Tags('DeleteAward')
  public async deleteAward(@Body() req: RestDeleteAward){
    const data = await new AwardService().deleteAward(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
