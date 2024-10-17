/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ enum: ['pending', 'completed'], default: 'pending' })
  status: 'pending' | 'completed';

}

export const TaskSchema = SchemaFactory.createForClass(Task);
