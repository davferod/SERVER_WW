/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput, UpdateTaskInput, RemoveTaskInput } from './dto/task.input';
//authenticacion y autorizacion
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ){
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  async findAll(
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
  ) {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  async findOne(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ) {
    return this.tasksService.findOne(id);
  }

  @Query(() => Task, { name: 'findByTask' })
  async findByID(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User,
    ) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User
    ) {
    return this.tasksService.update(updateTaskInput);
  }

  @Mutation(() => Task)
  async removeTask(
    @Args('id', { type: () => ID }) removeTaskInput: RemoveTaskInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) _user: User
    ) {
    return this.tasksService.remove(removeTaskInput._id);
  }
}
