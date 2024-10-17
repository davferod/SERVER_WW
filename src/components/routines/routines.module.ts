/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesResolver } from './routines.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Routine, RoutineSchema } from '@schemas/routine.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Routine.name, schema: RoutineSchema }])],
  providers: [RoutinesResolver, RoutinesService],
})
export class RoutinesModule {}
