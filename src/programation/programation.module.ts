
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramationController } from './programation.controller';
import { ProgramationService } from './programation.service';
import { ProgramationView, ProgramationSchema } from './schemas/programation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProgramationView.name, schema: ProgramationSchema }])],
  controllers: [ProgramationController],
  providers: [ProgramationService],
})
export class ProgramationModule {}