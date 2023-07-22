import { Exercise } from '../exercises/exercise.entity';

export class WorkoutModel {
  public duration: number;

  public difficulty: string;

  public exercises: Exercise[] | number;
}
