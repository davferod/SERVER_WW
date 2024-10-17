/* eslint-disable prettier/prettier */
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class LoginUserInput {
    
    @Field(() => String)
    @IsNotEmpty()
    username: string;

    @Field(() => String)
    @MinLength(6)
    password: string;

    @Field(() => String)
    @IsEmail()
    email: string;
}