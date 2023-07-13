import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Exercise } from '../exercises/exercise.entity';

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
