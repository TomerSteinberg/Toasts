import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;

  @IsNotEmpty()
  isAdmin: boolean;
}
