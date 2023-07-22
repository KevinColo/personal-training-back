import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Exercise } from '../exercises/exercise.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutTemplate } from '../workout-template/workout-template.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsInt()
  public workoutTemplate: WorkoutTemplate;

  @IsNotEmpty()
  @IsInt()
  public duration: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Exercise)
  public exercises: Exercise[] | number;
}
