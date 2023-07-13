import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
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
  @IsString()
  public muscleGroup: string;

  @Column()
  @IsNotEmpty()
  @IsIn(['Low', 'Medium', 'High'])
  public intensity: string;

  @Column()
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
