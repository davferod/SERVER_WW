/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Routine } from '@components/routines/entities/routine.entity';
import { Task } from '@components/tasks/entities/task.entity';
import { AbstractModel } from 'src/common/abstract.model';

@ObjectType()
export class Card extends AbstractModel {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  position: number;

  @Field(() => [Task], { nullable: true })
  tasks: Types.ObjectId[]; 

  @Field(() => [Routine], { nullable: true })
  routines: Types.ObjectId[];

  @Field(() => ID)
  userid?: Types.ObjectId;
}
