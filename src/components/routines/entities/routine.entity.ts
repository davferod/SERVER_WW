/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { AbstractModel } from 'src/common/abstract.model';


@ObjectType()
class ExerciseDTO {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  sets: number;

  @Field(() => Int)
  repetitions: number;

  @Field(() => Int)
  restBetweenSets: number;

  @Field(() => Int)
  loadPercent: number;
}

@ObjectType()
export class Routine extends AbstractModel {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [ExerciseDTO])
  exercises: ExerciseDTO[];
}
