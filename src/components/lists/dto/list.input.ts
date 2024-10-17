/* eslint-disable prettier/prettier */
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CardInput } from '@components/cards/dto/card.input';
import { BoardInput } from '@components/boards/dto/board.input';
import { Types } from 'mongoose';
import { AbstractModel } from 'src/common/abstract.model';

@InputType()
export class ListInput extends AbstractModel{

  @Field()
  title: string;

  @Field(() => [CardInput], { nullable: true })
  cards: Types.ObjectId[]; 

  @Field(() => BoardInput)
  boardId: Types.ObjectId;

  @Field()
  position: number;
}

@InputType()
export class CreateListInput {
  
  @Field()
  title: string;

  @Field()
  position: number;

  @Field(() => [CardInput], { nullable: true })
  cards?: Types.ObjectId[]; 

  @Field(() => BoardInput)
  boardId: Types.ObjectId;
}

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => ID)
  _id: string;
}


@InputType()
export class RemoveListInput {
  @Field(() => ID)
  _id: Types.ObjectId;
}

@InputType()
export class UpdateListPositionInput {
  @Field(() => ID)
  listId: Types.ObjectId;

  @Field()
  position: number;
}

@InputType()
export class AddCardToListInput {
  @Field(() => ID)
  listId: Types.ObjectId;

  @Field(() => ID)
  cardId: Types.ObjectId;
}

@InputType()
export class RemoveCardFromListInput {
  @Field(() => ID)
  listId: Types.ObjectId;

  @Field(() => ID)
  cardId: Types.ObjectId;
}

@InputType()
export class UpdateListTitleInput {
  @Field(() => ID)
  listId: string;

  @Field()
  title: string;
}

@InputType()
export class AddListToBoardInput {
  @Field(() => ID)
  boardId: Types.ObjectId;

  @Field(() => ID)
  listId: Types.ObjectId;
}

@InputType()
export class RemoveListFromBoardInput {
  @Field(() => ID)
  boardId: string;

  @Field(() => ID)
  listId: string;
}

@InputType()
export class UpdateListBoardInput {
  @Field(() => ID)
  listId: Types.ObjectId;

  @Field(() => ID)
  boardId: Types.ObjectId;
}

@InputType()
export class UpdateListCardsInput {
  @Field(() => ID)
  listId: Types.ObjectId;

  @Field(() => [ID])
  cards: Types.ObjectId[];
}
