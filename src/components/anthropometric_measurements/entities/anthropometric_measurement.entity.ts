/* eslint-disable prettier/prettier */
import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AbstractModel } from 'src/common/abstract.model';

@ObjectType()
export class AnthropometricMeasurement extends AbstractModel {

  @Field(() => ID)
  userId?: Types.ObjectId;

  @Field()
  date: Date;

  @Field(() => Float)
  height: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Float)
  bodyMassIndex: number;

  @Field(() => Float)
  waistCircumference: number;

  @Field(() => Float)
  hipCircumference: number;

  @Field(() => Float)
  legCircumference: number;

  @Field(() => Float)
  armCircumference: number;

}