/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsResolver } from './cards.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from '@schemas/card.schema';

import { RoutinesService } from '@components/routines/routines.service';
import { RoutinesModule } from '@components/routines/routines.module';
import { Routine, RoutineSchema } from '@schemas/routine.schema';

import { Task, TaskSchema } from '@schemas/task.schema';
import { TasksService } from '@components/tasks/tasks.service';
import { TasksModule } from '@components/tasks/tasks.module';

import { List, ListSchema } from '@schemas/list.schema';
import { ListsService } from '@components/lists/lists.service';
import { ListsModule } from '@components/lists/lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Routine.name, schema: RoutineSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    forwardRef(() => ListsModule),
    RoutinesModule,
    TasksModule,
  ],
  providers: [CardsResolver, CardsService, ListsService, RoutinesService, TasksService],
})
export class CardsModule {}
