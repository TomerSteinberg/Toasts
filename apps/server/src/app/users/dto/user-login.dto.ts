import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLogin {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
