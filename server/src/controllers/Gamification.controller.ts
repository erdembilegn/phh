import { Body, Controller, Get, Path, Post, Route, Security, Tags } from 'tsoa';
import { ResponseCreateGamification, ResponseGetGamification } from '../interfaces/gamification/response.interface';
import { RestCreateGamification } from '../interfaces/gamification/rest.interface';
import { GamificationService } from '../services/GamificationService';
import { get } from 'http';

@Route('/Gamification')
export class GamificationController extends Controller {
  @Post('/create')
  @Tags('CreateGamification')
  public async createGamification(@Body() req: RestCreateGamification): Promise<ResponseCreateGamification> {
    const data = await new GamificationService().createGamification(req);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(201);
    return data;
  }

  @Get('/get')
  @Tags('GetGamification')
  public async getGamification(): Promise<ResponseGetGamification> {
    const data = await new GamificationService().getGamification();
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
