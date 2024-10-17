/* eslint-disable prettier/prettier */
import { InputType, Field, ID, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class CreateAnthropometricInput {

  @Field(() => Float,)
  height: number;

  @Field(() => Float,)
  weight: number;

  @Field(() => Float,)
  bodyMassIndex: number;

  @Field(() => Float,)
  waistCircumference: number;

  @Field(() => Float,)
  hipCircumference: number;

  @Field(() => Float,)
  legCircumference: number;

  @Field(() => Float,)
  armCircumference: number;
  
}

@InputType()
  export class UpdateAnthropometricInput extends PartialType(CreateAnthropometricInput) {
    @Field(() => ID)
    readonly _id: string;
}

@InputType()
  export class FindOneAnthropometricInput {
    @Field(() => ID)
    readonly _id: string;
}