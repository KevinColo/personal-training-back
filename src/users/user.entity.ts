import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class User {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  constructor(id: number, username: string, password: string, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
