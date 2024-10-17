/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract.model';

@ObjectType()
export class Task extends AbstractModel {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  status: 'pending' | 'completed';

}
