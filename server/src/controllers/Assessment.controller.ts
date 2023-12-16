import { Body, Controller, Delete, Get, Post, Put, Route, Tags } from 'tsoa';
import {
  ResponseCreateAssessment,
  ResponseGetAssessment,
  ResponseUpdateAssessment,
} from '../interfaces/assessment/response.interface';
import {
  RestCreateAssessment,
  RestDeleteAssessment,
  RestUpdateAssessment,
} from '../interfaces/assessment/rest.interface';
import { AssessmentService } from '../services';

@Route('/assessment')
export class AssessmentController extends Controller {
  @Post('/create')
  @Tags('CreateAsessment')
  public async createAssessment(
    @Body() req: RestCreateAssessment,
  ): Promise<ResponseCreateAssessment> {
    const data = await new AssessmentService().createAssessment(req);
    this.setStatus(201);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }

  @Get('/get')
  @Tags('GetAsessment')
  public async getAssessment(): Promise<ResponseGetAssessment> {
    const data = await new AssessmentService().getAssessment();
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }

  @Put('/update')
  @Tags('UpdateAssessment')
  public async updateAssessment(
    @Body() req: RestUpdateAssessment,
  ): Promise<ResponseUpdateAssessment> {
    const data = await new AssessmentService().updateAssessment(req);
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }

  @Delete('/delete')
  @Tags('DeleteAssessment')
  public async deleteAssessment(@Body() req: RestDeleteAssessment) {
    const data = await new AssessmentService().deleteAssessment(req);
    this.setStatus(200);
    if (data.error) {
      this.setStatus(400);
      return data;
    }
    return data;
  }
}
