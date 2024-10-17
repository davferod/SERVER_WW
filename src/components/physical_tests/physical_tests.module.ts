/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PhysicalTestsService } from './physical_tests.service';
import { PhysicalTestsResolver } from './physical_tests.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalTest, PhysicalTestSchema } from '@schemas/physical_test.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PhysicalTest.name, schema: PhysicalTestSchema }])],
  providers: [PhysicalTestsResolver, PhysicalTestsService],
})
export class PhysicalTestsModule {}
