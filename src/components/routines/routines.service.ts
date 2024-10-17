/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Routine, RoutineDocument } from '@schemas/routine.schema';
import { CreateRoutineInput, UpdateRoutineInput } from './dto/routine.input';


@Injectable()
export class RoutinesService {
  constructor(@InjectModel(Routine.name) private readonly RoutineModel: Model<RoutineDocument>) {}
  
  async create(createRoutineInput: CreateRoutineInput): Promise<RoutineDocument> {
    try {
      const createdRoutine = await this.RoutineModel.create({
        ...createRoutineInput,
      });
      return createdRoutine;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findAll(): Promise<RoutineDocument[]> {
      return this.RoutineModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<RoutineDocument> {
    try {
      return this.RoutineModel.findById(id).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findByID(id: Types.ObjectId): Promise<RoutineDocument> {
    try {
      return this.RoutineModel.findById(id).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update( updateRoutineInput: UpdateRoutineInput): Promise<RoutineDocument> {
    try {
      const updatedRoutine = await this.RoutineModel.findByIdAndUpdate(
        updateRoutineInput._id,
        {
          ...updateRoutineInput
        },
        {new: true}
        ).exec();
      return updatedRoutine;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal'); 
    }
  }

  async remove(id: Types.ObjectId): Promise<RoutineDocument> {
    try {
      return this.RoutineModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal'); 
    }
  }
}
