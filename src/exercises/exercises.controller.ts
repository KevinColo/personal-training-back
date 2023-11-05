import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async findAll(@Query() query): Promise<Exercise[]> {
    const { muscleGroup, intensity, difficulty, ids } = query;

    // Si les identifiants sont fournis, récupérer les exercices correspondants
    if (ids) {
      const idsArray = ids.split(',').map(Number);
      return await this.exercisesService.findSome(idsArray);
    }

    // Sinon, récupérer tous les exercices en fonction des autres paramètres
    return this.exercisesService.findAll(muscleGroup, intensity, difficulty);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  //@UseGuards(AuthGuard('jwt')) // Exige une authentification JWT
  create(@Body() exercise: Exercise): Promise<Exercise> {
    return this.exercisesService.create(exercise);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // Exige une authentification JWT
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.exercisesService.delete(id);
  }
}
