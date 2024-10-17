/* eslint-disable prettier/prettier */
import {Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { AbstractModel } from 'src/common/abstract.model';

@InputType()
export class UserInput extends AbstractModel {
    @Field(() => String)
    @IsNotEmpty()
    username: string;

    @Field(() => String)
    @MinLength(6)
    password: string;
}

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    readonly username: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(12)
    readonly password: string;

    @Field(() => String)
    @IsEmail()
    email: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => ID)
    readonly _id: string;

    @Field(() => [ValidRoles], { nullable: true })
    @IsArray()
    @IsOptional()
    roles?: ValidRoles[];

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

@InputType()
export class FindUserInput {
    @Field()
    readonly username?: string;
}

@InputType()
export class UserSharedInput extends AbstractModel {
    @Field(() => String)
    username: string;
}