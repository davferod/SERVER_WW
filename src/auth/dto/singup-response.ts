/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class SingupResponse {
    @Field(() => String)
    accessToken: string;

    @Field(() => String, {nullable: true})
    refreshToken: string;
    
    @Field(() => User)
    user: User;
}