/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

import { LoginInput } from './dto';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) {}

    private getJwtToken(userId: string) {
        return this.jwtService.sign({ id: userId });
    }

    async validateUser(loginUserInput: LoginUserInput): Promise<any> {
        const { username, password } = loginUserInput;
        const user = await this.usersService.findOne(username);
        if (!bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid password do not match');
        }
        const valid = bcrypt.compare(password, user.password);
        if (user && valid) {
            const { password, ...result } = user;
            return result;
        }
        throw new Error('Invalid username or password');
    }

    async login(loginInput: LoginInput): Promise<LoginResponse> {
        const { email, password } = loginInput;
        const userFound = await this.usersService.findOne(email);
        console.log('service', userFound);
        if (!bcrypt.compareSync( password, userFound.password)) {
            throw new Error('Invalid user object');
        }
        try {
            const access_token = this.getJwtToken(userFound._id.toString());
            const refresh_token = this.getJwtToken(userFound.username.toString());
            return {
                accessToken: access_token,
                refreshToken: refresh_token,
                user: userFound,
            };
        } catch (error) {
            throw new Error('Error signing JWT token');
        }
    }

    async signup(loginUserInput: LoginUserInput): Promise<LoginResponse> {
        try {
            const createdUser = await this.usersService.create(loginUserInput);
            const user = createdUser
            const accessToken = this.getJwtToken(user._id.toString());
            const refreshToken = this.getJwtToken(user.username.toString());
            return {accessToken , refreshToken, user };

        } catch (error) {
            console.error('Error during user creation:', error);
            throw new Error('Error creating user');
        }
    }

    async validateUserById(id: string): Promise<User> {
        const user = await this.usersService.findOneById(id);
        if (!user.isActive) {
            throw new UnauthorizedException('User is inactive, talk to the admin');
        }
        delete user.password;
        return user;
    }

    // buscar si email esta disponible para registrarse
    async isAvailable(email_user: string): Promise<User> {
        const user = await this.usersService.findOne(email_user);
        if (!user) {
            throw new UnauthorizedException('Email is available');
        }
        const userAvailable = await this.usersService.findOne(email_user);
        return userAvailable;
    }

    async revalidateToken(user: User): Promise<LoginResponse> {
        const accessToken = this.getJwtToken(user._id.toString());
        const refreshToken = this.getJwtToken(user.username.toString());
        return { accessToken, refreshToken, user };
    }
}
