/* eslint-disable prettier/prettier */
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService,
    ) {
        super(
            {   
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: configService.get('JWT_SECRET'),
                loggin: true,
            }
        );
    }

    async validate(payload: JwtPayload): Promise<User> {
        // Validar el token y retornar el objeto de usuario.
        const { id } = payload
        const user = await this.authService.validateUserById(id);
        return user;

    }
}