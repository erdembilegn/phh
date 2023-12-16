import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import {
  ResponseCreateGamification,
  ResponseGetGamification,
} from '../interfaces/gamification/response.interface';
import { RestCreateGamification } from '../interfaces/gamification/rest.interface';
import { GamificationService } from '../services';

@Route('/Gamification')
export class GamificationController extends Controller {
  @Post('/create')
  @Tags('CreateGamification')
  public async createGamification(
    @Body() req: RestCreateGamification,
  ): Promise<ResponseCreateGamification> {
    const data = await new GamificationService().createGamification(req);
    this.setStatus(201);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }

  @Get('/get')
  @Tags('GetGamification')
  public async getGamification(): Promise<ResponseGetGamification> {
    const data = await new GamificationService().getGamification();
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }
}
