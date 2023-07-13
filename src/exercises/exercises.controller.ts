import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() exercise: Exercise): void {
    this.exercisesService.create(exercise);
  }

  @Get()
  findAll(): Exercise[] {
    return this.exercisesService.findAll();
  }
}
