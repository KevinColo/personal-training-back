import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WorkoutTemplatesService } from './workout-templates.service';
import { WorkoutTemplate } from './workout-template.entity';

@Controller('workout-templates')
export class WorkoutTemplatesController {
  constructor(
    private readonly workoutTemplatesService: WorkoutTemplatesService,
  ) {}

  @Post()
  create(@Body() workoutTemplate: WorkoutTemplate) {
    return this.workoutTemplatesService.create(workoutTemplate);
  }

  @Get()
  findAll() {
    return this.workoutTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutTemplatesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutTemplatesService.remove(+id);
  }
}
