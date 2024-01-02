import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;
}
