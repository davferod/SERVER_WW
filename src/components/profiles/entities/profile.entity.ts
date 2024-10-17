/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Board } from '../../boards/entities/board.entity';
import { Routine } from '../../routines/entities/routine.entity';
import { AbstractModel } from 'src/common/abstract.model';
import { UserPopulate } from '../../../users/entities/user.entity';

@ObjectType()
export class GymDTO {
  @Field()
  name: string;

  @Field()
  location: string;
}


@ObjectType()
export class Profile extends AbstractModel {

  @Field(()=>String, { nullable: true })
  full_name: string;

  @Field(()=>String, { nullable: true })
  profile_picture: string;

  @Field(() => String, { nullable: true })
  date_of_birth: string;

  @Field(()=>String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  cel_phone?: string;

  @Field({ nullable: true })
  levelexp?: string;

  @Field({ nullable: true })
  health_history?: string;

  @Field(() => GymDTO, { nullable: true })
  associated_gym?: GymDTO;

  @Field(() => [Routine], { nullable: true })
  routines?: Types.ObjectId[];

  @Field(() => [Board], { nullable: true })
  boardId?: Types.ObjectId[];

  @Field(() => UserPopulate, { nullable: true })
  userId?: Types.ObjectId;

}

