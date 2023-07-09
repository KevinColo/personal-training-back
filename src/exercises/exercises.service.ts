import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class Exercise {
  @IsNotEmpty()
  @IsString()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public muscleGroup: string;

  @IsNotEmpty()
  @IsIn(['Low', 'Medium', 'High'])
  public intensity: string;

  @IsNotEmpty()
  @IsIn(['Easy', 'Medium', 'Hard'])
  public difficulty: string;

  constructor(
    id: number,
    name: string,
    description: string,
    muscleGroup: string,
    intensity: string,
    difficulty: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.muscleGroup = muscleGroup;
    this.intensity = intensity;
    this.difficulty = difficulty;
  }
}

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
