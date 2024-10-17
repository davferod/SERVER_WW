/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import {  IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class LoginInput {
    
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @MinLength(4)
    password: string;

}