/* eslint-disable prettier/prettier */
import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser({ username, password } as LoginUserInput);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
