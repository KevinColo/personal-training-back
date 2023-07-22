import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { Entity } from 'typeorm';
import { WorkoutTemplate } from './workout-template.entity';

@Entity()
export class WorkoutTemplateSetsEntity extends WorkoutTemplate {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public numSets: number;

  constructor(
    id: number,
    name: string,
    description: string,
    numRounds: number,
    workTime: number,
    numExercises: number,
    restBetweenRounds: number,
    intensity: string,
    numSets: number,
  ) {
    super(id, name, description, numRounds, workTime, numExercises, intensity);
    this.numSets = numSets;
  }

  getTotalTime() {
    // Temps total pour un tour (ou cycle) = (temps de travail + temps de repos) * nombre d'exercices + repos entre les tours
    return (
      (this.workTime + this.restTime) * this.numExercises +
      this.restBetweenRounds
    );
  }
}
