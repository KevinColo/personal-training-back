import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { WorkoutTemplate } from './workout-template.entity';
import { Exercise } from '../exercises/exercise.entity';

@Entity()
export class WorkoutTemplatePyramidEntity extends WorkoutTemplate {
  @ManyToOne((_type) => Exercise)
  public levelOneExercise1: Exercise;

  @ManyToOne((_type) => Exercise)
  public levelOneExercise2: Exercise;

  @ManyToOne((_type) => Exercise)
  public levelTwoExercise1: Exercise;

  @ManyToOne((_type) => Exercise)
  public levelTwoExercise2: Exercise;

  @ManyToOne((_type) => Exercise)
  public levelThreeExercise1: Exercise;

  @ManyToOne((_type) => Exercise)
  public levelThreeExercise2: Exercise;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public levelOneWorkTime: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public levelTwoWorkTime: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public levelThreeWorkTime: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public numCycles: number;

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
    levelOneExercise1: Exercise,
    levelOneExercise2: Exercise,
    levelTwoExercise1: Exercise,
    levelTwoExercise2: Exercise,
    levelThreeExercise1: Exercise,
    levelThreeExercise2: Exercise,
  ) {
    super(id, name, description, numRounds, workTime, numExercises, intensity);
    this.levelOneWorkTime = levelOneWorkTime;
    this.levelTwoWorkTime = levelTwoWorkTime;
    this.levelThreeWorkTime = levelThreeWorkTime;
    this.restTime = restTime;
    this.numCycles = numCycles;
    this.levelOneExercise1 = levelOneExercise1;
    this.levelOneExercise2 = levelOneExercise2;
    this.levelTwoExercise1 = levelTwoExercise1;
    this.levelTwoExercise2 = levelTwoExercise2;
    this.levelThreeExercise1 = levelThreeExercise1;
    this.levelThreeExercise2 = levelThreeExercise2;
  }

  getTotalTime() {
    return (
      (this.levelOneWorkTime +
        this.levelTwoWorkTime +
        this.levelThreeWorkTime +
        this.restTime) *
        this.numCycles +
      this.restBetweenRounds
    );
  }
}
