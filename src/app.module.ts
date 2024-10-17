import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AnthropometricMeasurementsModule } from './components/anthropometric_measurements/anthropometric_measurements.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
//components

import { BoardsModule } from './components/boards/boards.module';
import { CardsModule } from './components/cards/cards.module';
import { ListsModule } from './components/lists/lists.module';
import { PhysicalTestsModule } from './components/physical_tests/physical_tests.module';
import { ProfilesModule } from './components/profiles/profiles.module';
import { RoutinesModule } from './components/routines/routines.module';
import { TasksModule } from './components/tasks/tasks.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ AuthModule],
      inject: [ JwtService],
      useFactory: async ( jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault(),
        ],
        context({ req }){
/*           const token = req.headers.authorization?.replace('Bearer ', '');
          const payload = jwtService.verify(token);
          if ( !payload ) throw new Error('Invalid token'); */
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    AnthropometricMeasurementsModule,
    BoardsModule,
    CardsModule,
    ListsModule,
    PhysicalTestsModule,
    ProfilesModule,
    RoutinesModule,
    TasksModule,
    DatabaseModule,
  ]
})
export class AppModule {}
