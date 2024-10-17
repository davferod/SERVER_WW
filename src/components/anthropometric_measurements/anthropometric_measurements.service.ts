/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AnthrMeasurements, AnthrMeasurementsDocument } from '@schemas/anthr_measurements.schema';

import { CreateAnthropometricInput, UpdateAnthropometricInput } from './dto/anthropometric.input';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class AnthropometricMeasurementsService {
  constructor(@InjectModel(AnthrMeasurements.name) private readonly AnthrMeasurementsModel: Model<AnthrMeasurementsDocument>) {}

  async create(createAnthropometricInput: CreateAnthropometricInput, _userId: Types.ObjectId): Promise<AnthrMeasurementsDocument>  {
    try {
      const createdAnthropometric = await this.AnthrMeasurementsModel.create({
        ...createAnthropometricInput,
        userId: _userId
      });

      return createdAnthropometric;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
    
  }

  findAll(roles: ValidRoles[]): Promise<AnthrMeasurementsDocument[]> {
    if (roles.length === 0) {
      return this.AnthrMeasurementsModel.find().exec();
    } 
    return this.AnthrMeasurementsModel.find({role: {$in: roles}}).exec();
  }

  findOne(id: Types.ObjectId): Promise<AnthrMeasurementsDocument> {
    try {
      const objectId = new Types.ObjectId(id);
      return this.AnthrMeasurementsModel.findOne({_id: objectId}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  findByID(id: Types.ObjectId): Promise<AnthrMeasurementsDocument> {
    try {
      return this.AnthrMeasurementsModel.findById(id).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  findOneByUser(userId: Types.ObjectId): Promise<AnthrMeasurementsDocument[]> {
    try {
      return this.AnthrMeasurementsModel.find({userId: userId}).exec();
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${userId} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update(UpdateAnthropometricInput: UpdateAnthropometricInput): Promise<AnthrMeasurementsDocument> {
    try{
      return this.AnthrMeasurementsModel.findByIdAndUpdate(
        UpdateAnthropometricInput._id,
        {
          ...UpdateAnthropometricInput,
          },
        {new: true}
        ).exec();
    } catch (error) {
      console.error('Error during user update:', error);
      throw new NotFoundException(`${UpdateAnthropometricInput._id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async remove(id: Types.ObjectId): Promise<AnthrMeasurementsDocument> {
    try {
      return this.AnthrMeasurementsModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error during user deletion:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }
}
