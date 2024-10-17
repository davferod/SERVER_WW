/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  position: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Routine' }] })
  routines: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userid?: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);

