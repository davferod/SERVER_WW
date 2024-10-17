/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AnthropometricMeasurementsService } from './anthropometric_measurements.service';
import { AnthropometricMeasurement } from './entities/anthropometric_measurement.entity';
import { CreateAnthropometricInput, UpdateAnthropometricInput } from './dto/anthropometric.input';
//authenticacion y autorizacion
import { ValidRolesArgs } from '../../common/args/roles.args';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';

@Resolver(() => AnthropometricMeasurement)
@UseGuards(JwtAuthGuard)
export class AnthropometricMeasurementsResolver {
  constructor(private readonly anthropometricMeasurementsService: AnthropometricMeasurementsService) {}

  @Mutation(() => AnthropometricMeasurement)
  async createAnthropometricMeasurement(
    @Args('createAnthropometricMeasurementInput') createAnthropometricInput: CreateAnthropometricInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) user: User,
    ) {
    return this.anthropometricMeasurementsService.create(createAnthropometricInput, user._id);
  }

  @Query(() => [AnthropometricMeasurement], { name: 'anthropometricMeasurements' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) user: User,
  ): Promise<AnthropometricMeasurement[]> {
    console.log('validRoles', validRoles, user);
    return this.anthropometricMeasurementsService.findAll(validRoles.roles);
  }

  @Query(() => AnthropometricMeasurement, { name: 'findOneAnthropometric' })
  async findOne(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ) {
    return this.anthropometricMeasurementsService.findOne(id);
  }

  @Query(() => AnthropometricMeasurement, { name: 'findOneByIdAnthropometric' })
  async findOneById(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ) {
    console.log('user', user);
    return this.anthropometricMeasurementsService.findOne(id);
  }

  @Query(() => AnthropometricMeasurement, { name: 'findOneByUserAnthropometric' })
  async findOneByUser(
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ) {
    return this.anthropometricMeasurementsService.findOneByUser(user._id);
  }

  @Mutation(() => AnthropometricMeasurement, {name: 'updateAnthropometricMeasurement'})
  async updateAnthropometricMeasurement(
    @Args('updateAnthropometricMeasurementInput') updateAnthropometricInput: UpdateAnthropometricInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) user: User,
    ) {
    return this.anthropometricMeasurementsService.update(updateAnthropometricInput);
  }

  @Mutation(() => AnthropometricMeasurement, {name: 'removeAnthropometricMeasurement'})
  async removeAnthropometricMeasurement(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    
    ) {
    return this.anthropometricMeasurementsService.remove(id);
  }
}
