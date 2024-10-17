/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AnthropometricMeasurementsService } from './anthropometric_measurements.service';
import { AnthropometricMeasurementsResolver } from './anthropometric_measurements.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AnthrMeasurements, AnthrMeasurementsSchema } from '@schemas/anthr_measurements.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: AnthrMeasurements.name, schema: AnthrMeasurementsSchema }])],
  providers: [AnthropometricMeasurementsResolver, AnthropometricMeasurementsService],
})
export class AnthropometricMeasurementsModule {}
