/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: true })
export class Board {
  @Prop()
  title: string;

  @Prop()
  backgroundColor: string; // Podrías definir un tipo específico si tienes una lista de colores

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User', index: true }] })
  members?: Types.ObjectId[]; 

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId?: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);

