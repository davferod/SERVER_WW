/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AbstractModel } from 'src/common/abstract.model';

@ObjectType()
export class Board extends AbstractModel {
  @Field()
  title: string;

  @Field()
  backgroundColor: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [ID], { nullable: true })
  members?: Types.ObjectId[]; 

  @Field(() => ID, { nullable: true })
  userId?: Types.ObjectId;
}
