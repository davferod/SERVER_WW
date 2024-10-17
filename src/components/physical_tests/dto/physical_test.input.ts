/* eslint-disable prettier/prettier */
import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
class TestResultsInput {
  @Field(() => Float)
  weight: number;

  @Field(() => Int)
  repetitions: number;
}

@InputType()
export class RunningDistanceInput {
  @Field(() => Float)
  distance: number;

  @Field(() => String)
  time: string;
}

@InputType()
export class SprintInput {
  @Field(() => Float)
  distance: number;

  @Field(() => String)
  time: string;
}

@InputType()
export class CreatePhysicalTestInput {
  @Field()
  testDate: Date;

  @Field(() => TestResultsInput,)
  squat: TestResultsInput;

  @Field(() => TestResultsInput)
  benchPress: TestResultsInput;

  @Field(() => TestResultsInput)
  militaryPress: TestResultsInput;

  @Field(() => Float,)
  pullUps: number;

  @Field(() => Float,)
  verticalJump: number;

  @Field(() => Float,)
  horizontalJump: number;

  @Field(() => RunningDistanceInput,)
  runningDistance: RunningDistanceInput;

  @Field(() => SprintInput, { nullable: true })
  sprint: SprintInput;

}

@InputType()
export class UpdatePhysicalTestInput extends CreatePhysicalTestInput {
  @Field()
  readonly _id: string;
}

@InputType()
export class FindOnePhysicalTestInput {
  @Field()
  readonly _id: string;
}
