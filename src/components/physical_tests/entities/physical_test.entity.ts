/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AbstractModel } from 'src/common/abstract.model';
import { UserPopulate } from '../../../users/entities/user.entity'; 

@ObjectType()
class TestResultsDTO {
  @Field()
  weight: number;

  @Field()
  repetitions: number;
}

@ObjectType()
class RunningDistanceDTO {
  @Field()
  distance: number;

  @Field()
  time: string;
}


@ObjectType()
export class PhysicalTest extends AbstractModel {

  @Field(() => UserPopulate, { nullable: true })
  userId?: Types.ObjectId;

  @Field()
  testDate: Date;

  @Field(() => TestResultsDTO)
  squat: TestResultsDTO;

  @Field(() => TestResultsDTO)
  benchPress: TestResultsDTO;

  @Field(() => TestResultsDTO)
  militaryPress: TestResultsDTO;

  @Field()
  pullUps: number;

  @Field()
  verticalJump: number;

  @Field()
  horizontalJump: number;

  @Field(() => RunningDistanceDTO)
  runningDistance: RunningDistanceDTO;

  @Field(() => RunningDistanceDTO)
  sprint: RunningDistanceDTO;
}



