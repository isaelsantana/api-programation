import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProgramationService } from './programation.service';
import { ProgramationView } from './schemas/programation.schema';

@Controller()
export class ProgramationController {
  constructor(private readonly service: ProgramationService) {} 

  @Get('programations')
   getAll(): Promise<ProgramationView[]> {    
    return this.service.findAll()       
  }

  @Get('programation/filter')
  getFilter(@Query() query): Promise<ProgramationView[]> {
    console.log("query", query);
    return this.service.find(query)       
  }

  @Get('programation/current')
  getCurrentProgramation(): Promise<ProgramationView[]> {   
    return this.service.findCurrentProgramation()       
  }

  @Get('programations/:id')
   getById(@Param() params): Promise<ProgramationView> {    
    return this.service.findById(params.id)       
  }
}
