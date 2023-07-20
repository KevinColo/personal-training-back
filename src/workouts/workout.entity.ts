import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Exercise } from '../exercises/exercise.entity';

export class Workout {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsInt()
  public templateId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Exercise)
  public exercises: Exercise[];

  constructor(
    id: number,
    name: string,
    templateId: number,
    exercises: Exercise[],
  ) {
    this.id = id;
    this.name = name;
    this.templateId = templateId;
    this.exercises = exercises;
  }
}
