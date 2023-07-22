import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { WorkoutTemplate } from './workout-template.entity';

@Entity()
export class WorkoutTemplatePyramidEntity extends WorkoutTemplate {
  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public levelOneWorkTime: number; // Temps de travail pour le niveau 1

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public levelTwoWorkTime: number; // Temps de travail pour le niveau 2

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public levelThreeWorkTime: number; // Temps de travail pour le niveau 3

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public restTime: number; // Temps de repos après chaque exercice

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public numCycles: number; // Nombre de fois que le cycle (1 min x 2, 45 sec x 2, 30 sec x 2) est répété

  constructor(
    id: number,
    name: string,
    description: string,
    numRounds: number,
    workTime: number,
    numExercises: number,
    restBetweenRounds: number,
    intensity: string,
    numCycles: number,
    levelOneWorkTime: number,
    levelTwoWorkTime: number,
    levelThreeWorkTime: number,
    restTime: number,
  ) {
    super(id, name, description, numRounds, workTime, numExercises, intensity);
    this.levelOneWorkTime = levelOneWorkTime;
    this.levelTwoWorkTime = levelTwoWorkTime;
    this.levelThreeWorkTime = levelThreeWorkTime;
    this.restTime = restTime;
    this.numCycles = numCycles;
  }

  getTotalTime() {
    // Temps total pour un tour (ou cycle) = (temps de travail pour chaque niveau de la pyramide + temps de repos) * nombre d'exercices + repos entre les tours
    return (
      (this.levelOneWorkTime +
        this.levelTwoWorkTime +
        this.levelThreeWorkTime +
        this.restTime) *
        this.numExercises +
      this.restBetweenRounds
    );
  }
}
