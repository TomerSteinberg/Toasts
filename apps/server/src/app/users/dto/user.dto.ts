import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;
}
