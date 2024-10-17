/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RoutinesService } from './routines.service';
import { Routine } from './entities/routine.entity';
import { CreateRoutineInput, UpdateRoutineInput, RemoveRoutineInput, FindRoutineInput } from './dto/routine.input';
//authenticacion y autorizacion
import { ValidRolesArgs } from '../../common/args/roles.args';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Routine)
@UseGuards(JwtAuthGuard)
export class RoutinesResolver {
  constructor(private readonly routinesService: RoutinesService) {}

  @Mutation(() => Routine)
  async createRoutine(
    @Args('createRoutineInput') createRoutineInput: CreateRoutineInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ){
    return this.routinesService.create(createRoutineInput);
  }

  @Query(() => [Routine], { name: 'routines' })
  async findAll(
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
  ) {
    return this.routinesService.findAll();
  }

  @Query(() => Routine, { name: 'findOneRoutine' })
  async findOne(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ) {
    return this.routinesService.findOne(id);
  }

  @Query(() => Routine, { name: 'findByRoutine' })
  async findByID(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ) {
    return this.routinesService.findOne(id);
  }

  @Mutation(() => Routine)
  async updateRoutine(
    @Args('updateRoutineInput') updateRoutineInput: UpdateRoutineInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User
    ) {
    return this.routinesService.update(updateRoutineInput);
  }

  @Mutation(() => Routine)
  async removeRoutine(
    @Args('id', { type: () => ID }) removeRoutineInput: RemoveRoutineInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ) {
    return this.routinesService.remove(removeRoutineInput._id);
  }
}
