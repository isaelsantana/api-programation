import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProgramationService } from './programation.service';
import { Programation } from './schemas/programation.schema';

@Controller()
export class ProgramationController {
  constructor(private readonly service: ProgramationService) {} 

  @Get('programations')
   getAll(): Promise<Programation[]> {    
    return this.service.findAll()       
  }

  @Get('programation/filter')
  getFilter(@Query() query): Promise<Programation[]> {
    console.log("query", query);
    return this.service.find(query)       
  }

  @Get('programations/:id')
   getById(@Param() params): Promise<Programation> {    
    return this.service.findById(params.id)       
  }
}
