/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Board, BoardDocument } from '@schemas/board.schema';
import { CreateBoardInput, UpdateBoardInput, RemoveBoardInput } from './dto/board.input';
import { ListsService } from '@components/lists/lists.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private readonly BoardModel: Model<BoardDocument>,
    private readonly listsService: ListsService,
  ) {}

  async create(createBoardInput: CreateBoardInput, _userId: Types.ObjectId): Promise<BoardDocument>  {
    try {
      console.log('creacion de board-service', createBoardInput);
      console.log('creacion de board-service _userId', _userId);
      const createdBoard = await this.BoardModel.create({
        ...createBoardInput,
        userId: _userId,
      });
      const createdList = await this.listsService.createFromBoard(createdBoard._id)
      console.log('creacion de board-service createdBoard', createdBoard);
      return createdBoard;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findAll(): Promise<BoardDocument[]> {
    const allBoards = await this.BoardModel.find().exec();
    console.log('allBoards', allBoards);
    return allBoards;
  }

  async findOne(id: Types.ObjectId): Promise<BoardDocument> {
    try {
      return this.BoardModel.findOne({_id: id}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findByID(id: Types.ObjectId): Promise<BoardDocument> {
    try {
      return this.BoardModel.findById(id).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findOneByUser(userId: Types.ObjectId): Promise<BoardDocument[]> {
    try {
      return this.BoardModel.find({userId: userId}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${userId} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update(updateBoardInput: UpdateBoardInput): Promise<BoardDocument> {
    try {
      const updatedBoard = await this.BoardModel.findByIdAndUpdate(
        updateBoardInput._id,
        {
          ...updateBoardInput,
        },
        { new: true }
        ).exec();
      return updatedBoard;
    } catch (error) {
      console.error('Error during user update:', error);
      throw new NotFoundException(`${updateBoardInput._id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async remove(removeBoardInput: RemoveBoardInput): Promise<BoardDocument> {
    try {
      return this.BoardModel.findByIdAndDelete(removeBoardInput._id).exec();
    } catch (error) {
      console.error('Error during user remove:', error);
      throw new NotFoundException(`${removeBoardInput._id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }
}
