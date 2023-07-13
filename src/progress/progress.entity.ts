import { IsNotEmpty, IsInt } from 'class-validator';

export class Progress {
  @IsNotEmpty()
  public userId: number;

  @IsNotEmpty()
  @IsInt()
  public workoutId: number;

  @IsNotEmpty()
  @IsInt()
  public progress: number;

  constructor(userId: number, workoutId: number, progress: number) {
    this.userId = userId;
    this.workoutId = workoutId;
    this.progress = progress;
  }
}
