/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from '@schemas/user.schema';
import { ProfilesModule } from '@components/profiles/profiles.module';
import { ProfilesService } from '@components/profiles/profiles.service';
import { Profile, ProfileSchema } from '@schemas/profile.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    ProfilesModule,
  ],
  providers: [UsersResolver, UsersService, ProfilesService],
  exports: [UsersService],
})
export class UsersModule {}
