/* eslint-disable prettier/prettier */
import {Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AbstractModel } from 'src/common/abstract.model';
import { BoardInput } from '../../boards/dto/board.input';
import { RoutineInput } from '../../routines/dto/routine.input';
import { Types } from 'mongoose';

@InputType()
export class GymInput {
  @Field()
  name: string;

  @Field()
  location: string;
}

@InputType()
export class ProfileInput extends AbstractModel {
  @Field(()=>String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @Field(()=>String, { nullable: true })
  @IsOptional()
  profile_picture: string;

  @Field(() => String, { nullable: true })
  date_of_birth: string;

  @Field(()=>String, { nullable: true })
  gender?: string;

  @Field(()=>String, { nullable: true })
  cel_phone?: string;

  @Field({ nullable: true })
  levelexp?: string;

  @Field({ nullable: true })
  health_history?: string;

  @Field(() => GymInput, { nullable: true })
  associated_gym?: GymInput;

  @Field(() => [RoutineInput], { nullable: true })
  @IsOptional()
  @IsArray()
  routines?: Types.ObjectId[];

  @Field(() => [BoardInput], { nullable: true })
  boardId?: Types.ObjectId[];

}

@InputType()
export class CreateProfileInput {
  @Field(()=>String)
  @IsString()
  full_name: string;

  @Field(()=>String, { nullable: true })
  @IsOptional()
  profile_picture: string;

  @Field(() => String, { nullable: true })
  date_of_birth: string;

  @Field(()=>String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  cel_phone?: string;

  @Field({ nullable: true })
  levelexp?: string;

  @Field({ nullable: true })
  health_history?: string;

  @Field(() => GymInput, { nullable: true })
  associated_gym?: GymInput;

  @Field(() => [RoutineInput], { nullable: true })
  routines?: Types.ObjectId[];

  @Field(() => [BoardInput], { nullable: true })
  boardId?: Types.ObjectId[];

}

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
    @Field(() => ID)
    readonly _id: string;
}

@InputType()
export class FindProfileInput {
  @Field(() => ID, { nullable: true })
  readonly _id?: string;

  @Field(() => ID)
  @IsOptional()
  readonly userId?: string;
}
