/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '@schemas/profile.schema';

import { CreateProfileInput, UpdateProfileInput } from './dto/profile.input';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>) {}

  async create(createProfileInput: CreateProfileInput, _userId: Types.ObjectId): Promise<ProfileDocument>  {
    try {
      const createdProfile = await this.profileModel.create({
        ...createProfileInput,
        userId: _userId,
      });
      // Ahora, realiza una consulta para obtener el documento del usuario con el populate
      const populatedUser = await this.profileModel
      .findById({_id: createdProfile._id}) 
      .populate('userId') // Reemplaza 'elCampoQueQuieresPopulate' con el nombre del campo que quieres populate
      .exec();
      return populatedUser;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async findAll(roles: ValidRoles[] ): Promise<ProfileDocument[]> {
    if (roles.length === 0) {
      const FoundUsers = await this.profileModel.find().populate({path:'userId'} ).exec();
      return FoundUsers; 
    } 
    return this.profileModel.find({role: {$in: roles}}).populate({path:'userId'}).exec();
  }

  async findOne(id: Types.ObjectId): Promise<ProfileDocument> {
    try {
      const objectId = new Types.ObjectId(id);
      const user = await this.profileModel.findOne({userId: objectId}).populate({path:'userId'}).exec();
      return user
    } catch (error) {
      console.error('Error during user finding:', error);
      throw new NotFoundException(`${id} not found`);  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async update(updateProfileInput: UpdateProfileInput, userUpdate: string): Promise<ProfileDocument> {
    const lastUpdatedById = new Types.ObjectId(userUpdate);
    try{

      const updateUser = await this.profileModel.findByIdAndUpdate(
        updateProfileInput._id,
        {
          ...updateProfileInput,
          userId: lastUpdatedById},
        {new: true}
        ).populate({path:'userId', select:'username'}).exec();
      return updateUser;
    } catch (error) {
      console.error('Error during user update:', error);
      throw new BadRequestException('algo salio mal');  // Lanza el error para que pueda ser capturado en la función signup
    }
  }

  async remove(id: string, userUpdate: string): Promise<ProfileDocument> {
    console.log('id', id, userUpdate);
    throw new Error('Method not implemented.');
  }
}
