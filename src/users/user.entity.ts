import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  public username: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  public password: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  public email: string;
}
