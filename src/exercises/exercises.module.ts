import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
