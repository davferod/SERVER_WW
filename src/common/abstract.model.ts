import  { Field, ID, ObjectType } from '@nestjs/graphql'
import { Types } from 'mongoose';

@ObjectType()
export abstract class AbstractModel {
    @Field(() => ID)
    _id?: Types.ObjectId;

    @Field(() => Date)
    readonly createdAt: Date;

    @Field(() => Date)
    readonly updatedAt: Date;

    @Field(() => Date, { nullable: true })
    readonly deletedAt?: Date;
}