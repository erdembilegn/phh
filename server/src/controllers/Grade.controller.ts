import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { ResponseCreateGrade, ResponseGetGrade } from '../interfaces/grade/response.interface';
import { RestCreateGrade } from '../interfaces/grade/rest.interface';
import { GradeService } from '../services';

@Route('/grade')
export class GradeController extends Controller {
  @Post('/create')
  @Tags('CreateGrade')
  public async createGrade(@Body() req: RestCreateGrade): Promise<ResponseCreateGrade> {
    console.log(req);
    this.setStatus(201);
    const data = await new GradeService().createGrade(req);
    if (data.error) {
      this.setStatus(500);
      return data;
    }
    return data;
  }

  @Get('/get')
  @Tags('GetGrade')
  public async getGrade(): Promise<ResponseGetGrade> {
    const data = await new GradeService().getGrade();
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }
}
