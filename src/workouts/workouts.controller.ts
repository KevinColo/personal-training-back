import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { Workout } from './workout.entity';
import { WorkoutModel } from './workout.model';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() training: WorkoutModel): Promise<Workout> {
    return this.workoutsService.generateWorkout(training);
  }

  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workoutsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}
