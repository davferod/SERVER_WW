/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PhysicalTestDocument = HydratedDocument<PhysicalTest>;

@Schema({ timestamps: true })
export class PhysicalTest {

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId: Types.ObjectId;

  @Prop()
  testDate: Date;

  @Prop({type: Object})
  squat: {
    weight: number;
    repetitions: number;
  };

  @Prop({type: Object})
  benchPress: {
    weight: number;
    repetitions: number;
  };

  @Prop({type: Object})
  militaryPress: {
    weight: number;
    repetitions: number;
  };

  @Prop()
  pullUps: number;

  @Prop()
  verticalJump: number;

  @Prop()
  horizontalJump: number;

  @Prop({type: Object})
  runningDistance: {
    distance: number;
    time: string; // Puedes ajustar el tipo según cómo quieras representar el tiempo
  };

  @Prop({type: Object, required: false })
  sprint: {
    distance: number;
    time: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const PhysicalTestSchema = SchemaFactory.createForClass(PhysicalTest);
