import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { Entity } from 'typeorm';
import { WorkoutTemplate } from './workout-template.entity';

@Entity()
export class WorkoutTemplateMuscleBuildingEntity extends WorkoutTemplate {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public numReps: number;

  constructor(
    id: number,
    name: string,
    description: string,
    numRounds: number,
    workTime: number,
    numExercises: number,
    restBetweenRounds: number,
    intensity: string,
    numReps: number,
  ) {
    super(id, name, description, numRounds, workTime, numExercises, intensity);
    this.numReps = numReps;
  }
}
