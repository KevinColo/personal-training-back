import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { Workout, WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() workout: Workout) {
    return this.workoutsService.create(workout);
  }

  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}
