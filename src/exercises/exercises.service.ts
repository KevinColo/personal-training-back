import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExercisesService {
  private readonly exercises: Exercise[] = [];

  create(exercise: Exercise) {
    const found = this.exercises.find((ex) => ex.name === exercise.name);
    if (found) {
      throw new HttpException(
        'Exercise already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.exercises.push(exercise);
  }

  findAll(): Exercise[] {
    return this.exercises;
  }
}
