import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workout } from './workout.entity';
import { ExercisesService } from '../exercises/exercises.service';
import { WorkoutTemplatesService } from '../workout-template/workout-templates.service';
import { Exercise } from '../exercises/exercise.entity';
import { WorkoutTemplate } from '../workout-template/workout-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Exercise, WorkoutTemplate])],
  providers: [WorkoutsService, ExercisesService, WorkoutTemplatesService],
  controllers: [WorkoutsController],
})
export class WorkoutsModule {}
