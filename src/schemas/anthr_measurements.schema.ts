/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnthrMeasurementsDocument = HydratedDocument<AnthrMeasurements>;

@Schema({ timestamps: true })
export class AnthrMeasurements {

  @Prop({ type: Types.ObjectId, ref: 'User', index: true  })
  userId: Types.ObjectId; // ID del usuario asociado a la medida antropométrica

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  bodyMassIndex: number;

  @Prop()
  waistCircumference: number;

  @Prop()
  hipCircumference: number;

  @Prop()
  legCircumference: number; // Circunferencia de la pierna

  @Prop()
  armCircumference: number; // Circunferencia del brazo a nivel del bíceps

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const AnthrMeasurementsSchema = SchemaFactory.createForClass(AnthrMeasurements);

