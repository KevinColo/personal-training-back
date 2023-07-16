import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRepository } from './exercise.repository';
import { Exercise } from './exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseRepository])],
  providers: [ExercisesService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
