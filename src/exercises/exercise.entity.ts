import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class Exercise {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public muscleGroup: string;

  @IsNotEmpty()
  @IsIn(['Low', 'Medium', 'High'])
  public intensity: string;

  @IsNotEmpty()
  @IsIn(['Easy', 'Medium', 'Hard'])
  public difficulty: string;

  constructor(
    id: number,
    name: string,
    description: string,
    muscleGroup: string,
    intensity: string,
    difficulty: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.muscleGroup = muscleGroup;
    this.intensity = intensity;
    this.difficulty = difficulty;
  }
}
