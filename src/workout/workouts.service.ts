import { Injectable } from '@nestjs/common';

import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Exercise } from '../exercises/exercises.service';

export class Workout {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Exercise)
  public exercises: Exercise[];

  constructor(id: number, name: string, exercises: Exercise[]) {
    this.id = id;
    this.name = name;
    this.exercises = exercises;
  }
}

@Injectable()
export class WorkoutsService {
  private workouts: Workout[] = [];

  create(workout: Workout) {
    this.workouts.push(workout);
  }

  findAll() {
    return this.workouts;
  }

  findOne(id: number) {
    return this.workouts.find((workout) => workout.id === id);
  }

  remove(id: number) {
    this.workouts = this.workouts.filter((workout) => workout.id !== id);
  }
}
