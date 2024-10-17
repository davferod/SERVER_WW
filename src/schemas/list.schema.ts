/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type ListDocument = HydratedDocument<List>;

@Schema({ timestamps: true })
export class List {

  @Prop()
  title: string;

  @Prop()
  position: number;

  @Prop({ type: [{type: Types.ObjectId, ref: 'Card', index: true}] })
  cards: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Board', index: true })
  boardId: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const ListSchema = SchemaFactory.createForClass(List);
