import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramationView, ProgramationDocument } from './schemas/programation.schema';

@Injectable()
export class ProgramationService {
  constructor(@InjectModel(ProgramationView.name) private programationModel: Model<ProgramationDocument>) {}

  async findAll(): Promise<ProgramationView[]> {
    return this.programationModel.find().sort({ datetime: 1 }).exec();
  }
  async find(filter: any): Promise<ProgramationView[]> {
    const query: any = this.getQueryFilter(filter)
    console.log('query' , query)
    return this.programationModel.find(query).sort({ datetime: 1 }).exec();
  }

  async findCurrentProgramation(): Promise<ProgramationView[]> {
    let dateNow = new Date();
    const query: any = {          
      'nextProgramation.datetime': {
        $gt: dateNow
      },                  
      datetime: {
        $lte: dateNow
      }             
    }
    console.log('query' , query)
    return this.programationModel.find(query).sort({ datetime: 1 }).exec();
  }

  async findById(id: string): Promise<ProgramationView> {
    return this.programationModel.findById(id).exec();
  }

  private getQueryFilter(filter: any): Promise<any> {
    let query: any = {}

    if (filter.channelCategory) 
      query = {...query, "channel.category.name": filter.channelCategory}
    
    if (filter.programCategory) 
      query = { ...query, "program.category": filter.programCategory }
    
    if (filter.initialProgramationDate || filter.finalProgramationDate) {
      let tomorrow = new Date(Date.now() + 864e5 * 1).toISOString();
      filter.finalProgramationDate = filter.finalProgramationDate ?? tomorrow
      query = { ...query, "datetime": { $gt: new Date(filter.initialProgramationDate), $lt: new Date(filter.finalProgramationDate) } }
    }
    
    if (filter.programName)
      query = { ...query, "program.name": { $regex: `.*${filter.programName}.*`, $options: 'i'} }

    if (filter.channelName)
      query = { ...query, "channel.name": { $regex: `.*${filter.channelName}.*`, $options: 'i' } }
    
    return query;
  }
}
