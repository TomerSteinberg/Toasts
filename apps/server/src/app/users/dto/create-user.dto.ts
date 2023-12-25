import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password: string;

  @IsNotEmpty()
  isAdmin: boolean;
}
