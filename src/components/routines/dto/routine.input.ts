/* eslint-disable prettier/prettier */
import {Field, ID, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractModel } from 'src/common/abstract.model';
import { Types } from 'mongoose';

@InputType()
export class ExercisesInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int,{ description: 'numero de sets del ejercicio' })
  @IsNumber()
  sets: number;

  @Field(() => Int, { description: 'numero de repeticiones' })
  @IsNumber()
  repetitions: number;

  @Field()
  restBetweenSets: string;

  @Field()
  loadPercent?: string;
}

@InputType()
export class RoutineInput extends AbstractModel {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [ExercisesInput], { nullable: true })
  @IsOptional()
  @IsArray()
  exercises?: ExercisesInput[];
}

@InputType()
export class CreateRoutineInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [ExercisesInput], { nullable: true })
  @IsOptional()
  @IsArray()
  exercises?: ExercisesInput[];
}

@InputType()
export class UpdateRoutineInput extends PartialType(CreateRoutineInput) {
  @Field(() => ID)
  readonly _id: string;
}

@InputType()
export class FindRoutineInput {
  @Field(() => ID, { nullable: true })
  readonly _id?: string;
}

@InputType()
export class RemoveRoutineInput {
  @Field(() => ID)
  _id: Types.ObjectId;
}

