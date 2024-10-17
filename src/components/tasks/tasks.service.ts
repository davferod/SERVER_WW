/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Task, TaskDocument } from '@schemas/task.schema';
import { CreateTaskInput, UpdateTaskInput, } from './dto/task.input';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly TaskModel: Model<TaskDocument>) {}
  async create(createTaskInput: CreateTaskInput) {
    try {
      const createdTask = await this.TaskModel.create(
        {
          ...createTaskInput
        });
      return createdTask;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findAll(): Promise<TaskDocument[]> { 
    return this.TaskModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<TaskDocument> {
    try {
      return this.TaskModel.findOne(id).exec();
    }
    catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findByID(id: Types.ObjectId): Promise<TaskDocument> {
    try {
      return this.TaskModel.findById(id).exec();
    }
    catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update( updateTaskInput: UpdateTaskInput): Promise<TaskDocument> {
    try {
      return this.TaskModel.findByIdAndUpdate(
        updateTaskInput._id,
        {
          ...updateTaskInput
        },
        {new: true}).exec(); 
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${updateTaskInput._id} not found`);
    }
  }

  async remove(id: Types.ObjectId): Promise<TaskDocument> {
    try {
      return this.TaskModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error during user deletion:', error);
      throw new BadRequestException('algo salio mal');
    }
  }
}
