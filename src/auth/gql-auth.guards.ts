/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext): LoginUserInput {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext()
        request.body = ctx.getArgs().loginUserInput;
        return request;
    }
}