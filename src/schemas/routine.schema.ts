/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoutineDocument = HydratedDocument<Routine>;

@Schema()
export class Routine {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  exercises: [{
    name: string;
    sets: number;
    repetitions: number;
    restBetweenSets: number;
    loadPercent: number
  }];

}

export const RoutineSchema = SchemaFactory.createForClass(Routine);
