/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PhysicalTestsService } from './physical_tests.service';
import { PhysicalTest } from './entities/physical_test.entity';
import { CreatePhysicalTestInput, UpdatePhysicalTestInput } from './dto/physical_test.input';
//authenticacion y autorizacion
import { ValidRolesArgs } from '../../common/args/roles.args';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';

@Resolver(() => PhysicalTest)
@UseGuards(JwtAuthGuard)
export class PhysicalTestsResolver {
  constructor(private readonly physicalTestsService: PhysicalTestsService) {}

  @Mutation(() => PhysicalTest)
  async createPhysicalTest(
    @Args('createPhysicalTestInput') createPhysicalTestInput: CreatePhysicalTestInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) user: User,
    ) {
    return this.physicalTestsService.create(createPhysicalTestInput, user._id);
  }

  @Query(() => [PhysicalTest], { name: 'physicalTests' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) user: User,
  ): Promise<PhysicalTest[]> {
    console.log('validRoles', validRoles, user);
    return this.physicalTestsService.findAll(validRoles.roles);
  }

  @Query(() => PhysicalTest, { name: 'findOnePhysicalTest' })
  async findOne(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ): Promise<PhysicalTest> {
    return this.physicalTestsService.findOne(id);
  }

  @Query(() => PhysicalTest, { name: 'findOneByIdPhysicalTest' })
  async findOneById(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ) {
    console.log('user', user);
    return this.physicalTestsService.findOne(id);
  }

  @Query(() => PhysicalTest, { name: 'findOneByUserPhysicalTest' })
  async findOneByUser(
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ) {
    return this.physicalTestsService.findOneByUser(user._id);
  }

  @Mutation(() => PhysicalTest)
  async updatePhysicalTest(
    @Args('updatePhysicalTestInput') updatePhysicalTestInput: UpdatePhysicalTestInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin, ValidRoles.user]) user: User,
    ) {
    return this.physicalTestsService.update(updatePhysicalTestInput);
  }

  @Mutation(() => PhysicalTest)
  async removePhysicalTest(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser([ValidRoles.admin, ValidRoles.superadmin]) user: User,
    ) {
    return this.physicalTestsService.remove(id);
  }
}
