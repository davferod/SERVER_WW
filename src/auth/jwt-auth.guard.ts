/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request;
    }
}