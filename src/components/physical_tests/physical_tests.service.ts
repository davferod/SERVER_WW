/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { PhysicalTest, PhysicalTestDocument } from '@schemas/physical_test.schema';
import { UpdatePhysicalTestInput, CreatePhysicalTestInput } from './dto/physical_test.input';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class PhysicalTestsService {
  constructor(@InjectModel(PhysicalTest.name) private readonly PhysicalTestModel: Model<PhysicalTestDocument>) {}

  async create(createPhysicalTestInput: CreatePhysicalTestInput, _userId: Types.ObjectId): Promise<PhysicalTestDocument>  {
    try {
      const createdPhysicalTest = await this.PhysicalTestModel.create({
        ...createPhysicalTestInput,
        userId: _userId
      });
      return createdPhysicalTest;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findAll(role: ValidRoles[]): Promise<PhysicalTestDocument[]>{
    if (role.length === 0) {
      return this.PhysicalTestModel.find().exec();
    } 
    return this.PhysicalTestModel.find({role: {$in: role}}).exec();
  }

  async findOne(id: Types.ObjectId): Promise<PhysicalTestDocument> {
    try {
      const objectId = new Types.ObjectId(id);
      return this.PhysicalTestModel.findOne({_id: objectId}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findByID(id: Types.ObjectId): Promise<PhysicalTestDocument> {
    try {
      return this.PhysicalTestModel.findById(id).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findOneByUser(userId: Types.ObjectId): Promise<PhysicalTestDocument[]> {
    try {
      return this.PhysicalTestModel.find({userId: userId}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${userId} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update(updatePhysicalTestInput: UpdatePhysicalTestInput): Promise<PhysicalTestDocument> {
    try {
      const updatedPhysicalTest = await this.PhysicalTestModel.findByIdAndUpdate(
        updatePhysicalTestInput._id,
        {
          ...updatePhysicalTestInput
        },
        {new: true}
        ).exec();
      return updatedPhysicalTest;
    } catch (error) {
      console.error('Error during user update:', error);
      throw new BadRequestException('algo salio mal');  
    }
  }

  async remove(id: Types.ObjectId): Promise<PhysicalTestDocument> {
    try {
      return this.PhysicalTestModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error during user deletion:', error);
      throw new BadRequestException('algo salio mal');  
    }
  }
}
