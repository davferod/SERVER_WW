/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
import { Board, BoardSchema } from '@schemas/board.schema';
import { ListsModule } from '@components/lists/lists.module';
import { ListsService } from '@components/lists/lists.service';
import { ListSchema, List } from '@schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    ListsModule,
  ],
  providers: [BoardsResolver, BoardsService, ListsService],
})
export class BoardsModule {}
