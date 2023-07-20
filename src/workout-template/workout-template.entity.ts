import { IsNotEmpty, IsString, IsInt, IsIn, IsPositive } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkoutTemplate {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public description: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  public numRounds: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  public workTime: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  public restTime: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public numExercises: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public restBetweenRounds: number;

  @Column()
  @IsNotEmpty()
  @IsIn(['Low', 'Medium', 'High'])
  public intensity: string;

  constructor(
    id: number,
    name: string,
    description: string,
    numRounds: number,
    workTime: number,
    numReps: number,
    intensity: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.numRounds = numRounds;
    this.workTime = workTime;
    this.intensity = intensity;
  }
}
