import { IsNotEmpty, IsString, IsArray, IsInt } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutTemplate } from '../workout-template/workout-template.entity';
import { Exercise } from '../exercises/exercise.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ManyToOne(() => WorkoutTemplate, { eager: true })
  @JoinColumn({ name: 'workoutTemplateId' })
  public workoutTemplate: WorkoutTemplate;

  @Column()
  @IsNotEmpty()
  @IsInt()
  public duration: number;

  @Column('simple-array')
  @IsNotEmpty()
  @IsArray()
  public exercisesId: number[];

  public exercises: Exercise[];
}
