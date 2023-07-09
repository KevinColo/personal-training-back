import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExercisesService, Exercise } from './exercises.service';

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
