/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop()
  full_name: string;

  @Prop()
  profile_picture: string;

  @Prop()
  date_of_birth: string;

  @Prop()
  gender: string;

  @Prop(String)
  cel_phone: string;

  @Prop()
  levelexp: string;

  @Prop()
  health_history: string;

  @Prop({type: Object})
  associated_gym: {
    name: string;
    location: string;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Routine' }] })
  routines: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Boards' }] })
  boardId: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', unique: true, sparse: true })
  userId?: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
