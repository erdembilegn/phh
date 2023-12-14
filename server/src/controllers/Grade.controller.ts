import { Body, Controller, Get, Post, Route, Security, Tags } from 'tsoa';
import { ResponseCreateGrade, ResponseGetGrade } from '../interfaces/grade/response.interface';
import { RestCreateGrade } from '../interfaces/grade/rest.interface';
import { GradeService } from '../services/GradeService';

@Route('/grade')
export class GradeController extends Controller {
  @Post('/create')
  @Tags('CreateGrade')
  public async createGrade(@Body() req: RestCreateGrade): Promise<ResponseCreateGrade> {
    console.log(req);
    const data = await new GradeService().createGrade(req);
    if(data.error){
      this.setStatus(500)
      return data;
    }
    this.setStatus(201);
    return data;
  }

  @Get('/get')
  @Tags('GetGrade')
  public async getGrade(): Promise<ResponseGetGrade> {
    const data = await new GradeService().getGrade();
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
