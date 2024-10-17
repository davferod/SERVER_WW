/* eslint-disable prettier/prettier */
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { UserInput, UserSharedInput } from 'src/users/dto/user.input';
import { AbstractModel } from 'src/common/abstract.model';
import { Types } from 'mongoose';


@InputType()
export class BoardInput extends AbstractModel {
  @Field()
  title: string;

  @Field()
  backgroundColor: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [ID], { nullable: true })
  members: Types.ObjectId[];

  @Field(() => UserSharedInput, { nullable: true })
  userId?: Types.ObjectId;

}

@InputType()
export class CreateBoardInput {
  @Field()
  title: string;

  @Field()
  backgroundColor: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [ID], { nullable: true })
  members?: UserInput[];

}

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
  @Field(() => ID)
  _id: Types.ObjectId;
}

@InputType()
export class RemoveBoardInput {
  @Field(() => ID)
  _id: Types.ObjectId;
}

@InputType()
export class AddMemberInput {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  member: Types.ObjectId;
}

@InputType()
export class RemoveMemberInput {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  member: Types.ObjectId;
}
