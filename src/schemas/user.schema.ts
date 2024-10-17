/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true, default: true})
  isActive: boolean;

  @Prop({default: 'user'})
  role: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  lastUpdatedById?: Types.ObjectId;

}

const userTransform = (_, ret) => {
  ret.lastUpdatedById = {
    _id: ret.lastUpdatedById?._id,
    username: ret.lastUpdatedById?.username,
    // Añadir otras propiedades según sea necesario
  };
  return ret;
};

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toObject', { transform: userTransform });
UserSchema.set('toJSON', { transform: userTransform });
