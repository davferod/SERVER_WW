/* eslint-disable prettier/prettier */
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class TaskInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  status?: 'pending' | 'completed';
}

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { defaultValue: 'pending' }) // Estableciendo un valor por defecto
  status: 'pending' | 'completed';

}

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  status?: 'pending' | 'completed';
}

@InputType()
export class RemoveTaskInput {
  @Field(() => ID)
  _id: Types.ObjectId;
}