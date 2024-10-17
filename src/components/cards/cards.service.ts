/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ListsService } from '@components/lists/lists.service';

import { Card, CardDocument } from '@schemas/card.schema';
import { CreateCardInput, UpdateCardInput, RemoveCardInput, UpdateCardPositionInput, MoveCardToListInput } from './dto/card.input';


@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private readonly CardModel: Model<CardDocument>, private readonly listsService: ListsService) {}

  async create(createCardInput: CreateCardInput,listId: string, _userId: Types.ObjectId): Promise<CardDocument> {
    const _listId = new Types.ObjectId(listId);
    try {
      const createdCard = await this.CardModel.create({
        ...createCardInput,
        listId: _listId,
        userId: _userId
      });
      await this.listsService.addCard(_listId, createdCard._id);
      return createdCard;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findAll(): Promise<CardDocument[]> {
    try {
      return this.CardModel.find().exec();
    } catch (error) {
      console.error('Error during findall:', error);
      throw new NotFoundException('No cards found');  // Lanza el error para que pueda ser capturado en la función
    }
  }

  async findOne(id: Types.ObjectId): Promise<CardDocument> {
    try {
      return this.CardModel.findOne({_id: id}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findByID(id: Types.ObjectId): Promise<CardDocument> {
    try {
      return this.CardModel.findById(id).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findOneByList(userId: Types.ObjectId): Promise<CardDocument[]> {
    try {
      return this.CardModel.find({userId: userId}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${userId} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async updateMoveCardToList(moveCardToListInput: MoveCardToListInput): Promise<CardDocument> {
    try {
      const updatedCard = await this.CardModel.findByIdAndUpdate(
        moveCardToListInput._id,
        {
          listId: moveCardToListInput.listIdNew
        },
        {new: true});
      await this.listsService.deleteCard(moveCardToListInput.listIdOld, moveCardToListInput._id);
      return updatedCard;
    } catch (error) {
      console.error('Error during user update:', error);
      throw new NotFoundException(`${moveCardToListInput._id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update(updateCardInput: UpdateCardInput): Promise<CardDocument> {
    try {
      const updatedCard = await this.CardModel.findByIdAndUpdate(
        updateCardInput._id,
        {
          ...updateCardInput
        },
        {new: true});
      return updatedCard;
    } catch (error) {
      console.error('Error during user update:', error);
      throw new NotFoundException(`${updateCardInput._id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async remove(removeCardInput: RemoveCardInput): Promise<CardDocument> {
    try {
      return this.CardModel.findByIdAndDelete(removeCardInput._id).exec();
    } catch (error) {
      console.error('Error during user remove:', error);
      throw new NotFoundException(`${removeCardInput._id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }
}
